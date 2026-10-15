import React, { useEffect, useMemo, useRef, useState } from 'react';
import { REC_ITEMS, RecItem } from './recsysData';

/*
  What the model actually learned, as a figure.

  The demo below lets you operate the model; this shows its insides. Every item
  is scored against every other - the vectors are L2-normalised, so a dot
  product is a cosine - and drawn as a matrix with the items grouped by theme.
  Nothing in the training data named a theme. If six blocks appear on the
  diagonal, the model recovered that structure from co-purchase alone.

  Diverging rather than sequential, because cosine has a meaningful zero: above
  it the model thinks two items go together, below it that they actively do
  not. Violet and olive are the poles with neutral at zero - never a hue at the
  midpoint. Chrome reflects a cool light and a warm one, so the poles are
  ice and copper. Both pairs were run through the palette validator rather
  than eyeballed - the first attempt failed the lightness band and the
  chroma floor in both modes - and now pass every check, worst pair dE 22.7
  protan on the dark surface and 22.5 on the light.

  Drawn to a canvas rather than as 1,296 SVG rects, on a page that is already
  paying for a backdrop-filter on every surface. Hit-testing is arithmetic on
  the pointer position, so the hover layer costs no extra nodes either.
*/

const CELL = 11;
const GAP = 2; // between theme blocks, so the six groups read as groups
const BLOCK = 6; // items per theme
const DOMAIN = 0.8; // colour saturates here; the diagonal (1.0) clamps to the end

const PALETTE = {
  dark: { pos: '#488ed2', neg: '#be762c', mid: '#121824' },
  light: { pos: '#286eb4', neg: '#9c5808', mid: '#e9eef5' }
};

type Lab = [number, number, number];

/* OKLab, so the ramp is perceptually even rather than even in sRGB. */
const toLin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toSrgb = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

const hexToOklab = (hex: string): Lab => {
  const n = parseInt(hex.slice(1), 16);
  const r = toLin(((n >> 16) & 255) / 255);
  const g = toLin(((n >> 8) & 255) / 255);
  const b = toLin((n & 255) / 255);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  ];
};

const oklabToCss = (lab: Lab) => {
  const l = (lab[0] + 0.3963377774 * lab[1] + 0.2158037573 * lab[2]) ** 3;
  const m = (lab[0] - 0.1055613458 * lab[1] - 0.0638541728 * lab[2]) ** 3;
  const s = (lab[0] - 0.0894841775 * lab[1] - 1.291485548 * lab[2]) ** 3;
  const to = (v: number) => Math.round(Math.min(1, Math.max(0, toSrgb(v))) * 255);
  const r = to(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s);
  const g = to(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s);
  const b = to(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
};

const mix = (a: Lab, b: Lab, t: number) =>
  oklabToCss([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]);

/* Resolve 'system' against the OS, and follow the theme switch while mounted. */
const useDarkMode = () => {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const read = () => {
      const mode = root.getAttribute('data-theme');
      setDark(mode === 'dark' || (mode !== 'light' && mq.matches));
    };
    read();
    mq.addEventListener('change', read);
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => {
      mq.removeEventListener('change', read);
      observer.disconnect();
    };
  }, []);
  return dark;
};

/* Pixel offset of row/column i, including the gaps between theme blocks. */
const span = (i: number) => i * CELL + Math.floor(i / BLOCK) * GAP;

const SimilarityMatrix = () => {
  const dark = useDarkMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hover, setHover] = useState<{ i: number; j: number; x: number; y: number } | null>(null);

  /* Group by theme so the blocks are contiguous, then score every pair. */
  const { items, matrix, themes, stats } = useMemo(() => {
    const items: RecItem[] = [...REC_ITEMS].sort(
      (a, b) => a.theme.localeCompare(b.theme) || b.plays - a.plays
    );
    const matrix = items.map(a => items.map(b => a.vec.reduce((s, v, k) => s + v * b.vec[k], 0)));

    const themes: { name: string; start: number; size: number }[] = [];
    items.forEach(it => {
      const last = themes[themes.length - 1];
      if (last && last.name === it.theme) last.size++;
      else themes.push({ name: it.theme, start: themes.reduce((n, t) => n + t.size, 0), size: 1 });
    });

    const mean = (xs: number[]) => xs.reduce((s, v) => s + v, 0) / (xs.length || 1);
    const stats = themes.map(t => {
      const inBlock = (k: number) => k >= t.start && k < t.start + t.size;
      const within: number[] = [];
      const between: number[] = [];
      let nn = 0;
      for (let i = t.start; i < t.start + t.size; i++) {
        let best = -2;
        let at = -1;
        for (let j = 0; j < items.length; j++) {
          if (i === j) continue;
          (inBlock(j) ? within : between).push(matrix[i][j]);
          if (matrix[i][j] > best) {
            best = matrix[i][j];
            at = j;
          }
        }
        if (items[at].theme === t.name) nn++;
      }
      return { name: t.name, within: mean(within), between: mean(between), nn, size: t.size };
    });

    return { items, matrix, themes, stats };
  }, []);

  const side = span(items.length - 1) + CELL;
  const nnTotal = stats.reduce((s, t) => s + t.nn, 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const p = dark ? PALETTE.dark : PALETTE.light;
    const mid = hexToOklab(p.mid);
    const pos = hexToOklab(p.pos);
    const neg = hexToOklab(p.neg);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = side * dpr;
    canvas.height = side * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, side, side);

    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < items.length; j++) {
        const v = Math.max(-DOMAIN, Math.min(DOMAIN, matrix[i][j])) / DOMAIN;
        ctx.fillStyle = v >= 0 ? mix(mid, pos, v) : mix(mid, neg, -v);
        ctx.fillRect(span(j), span(i), CELL, CELL);
      }
    }
  }, [dark, items, matrix, side]);

  const onMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const scale = side / rect.width;
    const at = (px: number) => {
      const v = px * scale;
      for (let k = 0; k < items.length; k++) {
        if (v >= span(k) && v < span(k) + CELL) return k;
      }
      return -1;
    };
    const j = at(event.clientX - rect.left);
    const i = at(event.clientY - rect.top);
    setHover(
      i < 0 || j < 0 ? null : { i, j, x: event.clientX - rect.left, y: event.clientY - rect.top }
    );
  };

  const p = dark ? PALETTE.dark : PALETTE.light;
  const midLab = hexToOklab(p.mid);
  const posLab = hexToOklab(p.pos);
  const negLab = hexToOklab(p.neg);
  const swatch = (t: number) => (t >= 0 ? mix(midLab, posLab, t) : mix(midLab, negLab, -t));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-5 mb-7">
        <div>
          <p className="text-[11px] font-mono text-gray-500 mb-2">// what the model learned</p>
          <h4 className="font-display text-xl md:text-2xl font-bold text-white leading-tight">
            Nobody told it what a theme was
          </h4>
        </div>
        <p className="font-mono text-[11px] text-gray-500 leading-relaxed">
          <span className="font-display text-3xl font-bold text-accent-ink align-middle mr-2">
            {nnTotal}/{items.length}
          </span>
          items whose nearest
          <br />
          neighbour shares their theme
        </p>
      </div>

      <div className="grid lg:grid-cols-[auto_1fr] gap-10 items-start">
        <div>
          <div className="flex gap-2.5">
            <div className="relative shrink-0" style={{ width: 76, height: side }}>
              {themes.map(t => (
                <span
                  key={t.name}
                  className="absolute right-0 font-mono text-[10px] text-gray-500 text-right leading-none"
                  style={{ top: span(t.start) + (t.size * CELL) / 2 - 4 }}
                >
                  {t.name}
                </span>
              ))}
            </div>

            <div className="relative" style={{ width: side, maxWidth: '100%' }}>
              <canvas
                ref={canvasRef}
                role="img"
                aria-label={
                  'Cosine similarity between all ' +
                  items.length +
                  ' item embeddings, grouped by theme. Six blocks appear on the diagonal: items sharing a theme score about +0.47 against each other and about -0.10 against everything else. The table beside this figure gives the numbers.'
                }
                style={{ width: side, maxWidth: '100%', height: 'auto', display: 'block' }}
                onPointerMove={onMove}
                onPointerLeave={() => setHover(null)}
              />
              {hover && (
                <div
                  className="pointer-events-none absolute z-20 rounded-lg border border-white/15 bg-dark/95 px-3 py-2"
                  style={{
                    left: Math.min(hover.x + 14, side - 152),
                    top: Math.max(0, hover.y - 50),
                    width: 152
                  }}
                >
                  <p className="text-[10.5px] text-gray-300 leading-snug truncate">
                    {items[hover.i].name}
                  </p>
                  <p className="text-[10.5px] text-gray-300 leading-snug truncate">
                    {items[hover.j].name}
                  </p>
                  <p className="font-mono text-[11px] text-accent-ink mt-1">
                    {matrix[hover.i][hover.j] >= 0 ? '+' : ''}
                    {matrix[hover.i][hover.j].toFixed(2)}
                    <span className="text-gray-500 ml-1.5">
                      {items[hover.i].theme === items[hover.j].theme ? 'same theme' : 'different'}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4" style={{ marginLeft: 86 }}>
            <span className="font-mono text-[10px] text-gray-500">&minus;0.8</span>
            <div className="flex h-2.5 rounded-sm overflow-hidden" style={{ width: 150 }}>
              {Array.from({ length: 33 }, (_, k) => (
                <span key={k} className="flex-1" style={{ background: swatch(k / 16 - 1) }} />
              ))}
            </div>
            <span className="font-mono text-[10px] text-gray-500">+0.8</span>
            <span className="font-mono text-[10px] text-gray-600 ml-1">cosine</span>
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            Rows and columns are the same {items.length} items, grouped by theme. The training data
            contained no themes &mdash; only which users bought which items. The blocks on the
            diagonal are the model inferring them.
          </p>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="font-mono text-[10px] text-gray-500 font-normal pb-2">theme</th>
                <th className="font-mono text-[10px] text-gray-500 font-normal pb-2 text-right">
                  within
                </th>
                <th className="font-mono text-[10px] text-gray-500 font-normal pb-2 text-right">
                  to others
                </th>
                <th className="font-mono text-[10px] text-gray-500 font-normal pb-2 text-right">
                  nearest
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.map(t => (
                <tr key={t.name} className="border-b border-white/5">
                  <td className="py-2 text-[13px] text-gray-300">{t.name}</td>
                  <td className="py-2 font-mono text-[12px] text-accent-ink text-right">
                    +{t.within.toFixed(2)}
                  </td>
                  <td className="py-2 font-mono text-[12px] text-gray-500 text-right">
                    {t.between.toFixed(2)}
                  </td>
                  <td className="py-2 font-mono text-[12px] text-gray-400 text-right">
                    {t.nn}/{t.size}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[11px] text-gray-500 leading-relaxed mt-5">
            Same model and the same synthetic dataset as the demo below &mdash; an illustration of
            the idea, not a result from the research.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimilarityMatrix;
