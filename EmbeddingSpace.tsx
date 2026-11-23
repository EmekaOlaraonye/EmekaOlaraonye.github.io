import React, { useEffect, useMemo, useRef, useState } from 'react';
import { REC_ITEMS, RecItem } from './recsysData';

/*
  The space the model built.

  The matrix below this shows what the model learned as numbers in a grid;
  this shows it as a place. Every item is a point in the twelve-dimensional
  space the recommender was trained in, projected onto its three principal
  components and turned slowly, with each item wired to its two nearest
  neighbours. The clusters are not drawn in - no theme was ever named in
  the training data, and the grouping you see is the only evidence that
  the model found one.

  Nothing here is coloured by theme on purpose. Position already encodes
  it, so a six-way categorical palette would be a second encoding of the
  same fact - and the one thing worth proving is that the structure holds
  without being told. Hovering an item lights its theme-mates instead, so
  the claim is checked on demand rather than asserted in the legend.

  Canvas rather than WebGL, and that is not a compromise: thirty-six
  points and seventy-two edges is a few hundred draw calls a frame, which
  a GPU context and a shader pipeline would not make faster on a page
  already paying for a backdrop-filter on every surface. It also means no
  new dependency and no context-loss handling.

  The motion stops while the pointer is on a point, because a label you
  have to chase is a label you cannot read.
*/

/* The first three principal components, by power iteration with deflation.
   Deterministic - the start vector is a fixed function of the index, not
   random - so the projection is the same on every load and in every
   screenshot. 12x12 covariance, so this is a few thousand multiplies. */
const pca3 = (vectors: number[][]) => {
  const n = vectors.length;
  const d = vectors[0].length;

  const mean = new Array(d).fill(0);
  for (const v of vectors) for (let i = 0; i < d; i++) mean[i] += v[i] / n;
  const centred = vectors.map(v => v.map((x, i) => x - mean[i]));

  const cov = Array.from({ length: d }, () => new Array<number>(d).fill(0));
  for (const row of centred) {
    for (let i = 0; i < d; i++) {
      for (let j = 0; j < d; j++) cov[i][j] += (row[i] * row[j]) / (n - 1);
    }
  }

  const components: number[][] = [];
  for (let k = 0; k < 3; k++) {
    let v = Array.from({ length: d }, (_, i) => Math.sin(i * 1.7 + k * 2.3) + 0.1);
    for (let iter = 0; iter < 200; iter++) {
      const w = new Array(d).fill(0);
      for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) w[i] += cov[i][j] * v[j];
      }
      /* Project out the components already found, so each pass converges on
         the next eigenvector rather than back onto the dominant one. */
      for (const c of components) {
        let dot = 0;
        for (let i = 0; i < d; i++) dot += w[i] * c[i];
        for (let i = 0; i < d; i++) w[i] -= dot * c[i];
      }
      let norm = 0;
      for (const x of w) norm += x * x;
      norm = Math.sqrt(norm) || 1;
      v = w.map(x => x / norm);
    }
    components.push(v);
  }

  const coords = centred.map(row =>
    components.map(c => {
      let s = 0;
      for (let i = 0; i < row.length; i++) s += row[i] * c[i];
      return s;
    })
  );

  /* Scale to the unit cube so the camera distance does not depend on how
     much variance this particular dataset happens to carry. */
  let span = 0;
  for (const p of coords) for (const x of p) span = Math.max(span, Math.abs(x));
  return coords.map(p => p.map(x => x / (span || 1)) as [number, number, number]);
};

const NEIGHBOURS = 2;

/* Half-amplitude of the swing, in radians. */
const SWING = 0.46;

type Node = {
  item: RecItem;
  base: [number, number, number];
  sx: number;
  sy: number;
  depth: number;
  r: number;
};

const EmbeddingSpace = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const hoverRef = useRef<number>(-1);
  const [hover, setHover] = useState<number>(-1);
  /* Whether this is a touchscreen, so the hint can say what to actually do.
     Read once on mount rather than from a CSS variant, because the string
     has to change too, not only its visibility. */
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    const read = () => setCoarse(mq.matches);
    read();
    mq.addEventListener('change', read);
    return () => mq.removeEventListener('change', read);
  }, []);

  const { items, coords, edges, neighbourOf } = useMemo(() => {
    const items = REC_ITEMS;
    const coords = pca3(items.map(it => it.vec));

    /* Nearest neighbours by cosine on the full twelve dimensions, not on the
       projection. The picture is a projection; the graph should not be, or it
       would be showing the drawing's structure rather than the model's. */
    const neighbourOf: number[][] = items.map((a, i) => {
      const scored = items
        .map((b, j) => ({ j, s: j === i ? -2 : a.vec.reduce((t, v, k) => t + v * b.vec[k], 0) }))
        .sort((p, q) => q.s - p.s);
      return scored.slice(0, NEIGHBOURS).map(s => s.j);
    });

    const seen = new Set<string>();
    const edges: [number, number][] = [];
    neighbourOf.forEach((ns, i) =>
      ns.forEach(j => {
        const key = i < j ? `${i}:${j}` : `${j}:${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([i, j]);
        }
      })
    );

    return { items, coords, edges, neighbourOf };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let phase = 0;
    let angle = 0;
    let frame = 0;
    let running = true;
    let last = performance.now();

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /* The cloud has to be fitted to the box, and fitted to what the rotation
       actually produces. Bounding x and y separately - largest hypot(x, z)
       for the width, largest |y| plus the tilt's share of z for the height -
       is correct but far too loose: it assumes some item has the extreme of
       both at once, and none does. Sweeping the arc in 1-degree steps gives
       the true extent for 36 points in a few thousand operations, once. */
    const reach = { x: 1e-6, y: 1e-6 };
    for (let a = -SWING; a <= SWING; a += Math.PI / 180) {
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      for (const p of coords) {
        const x = p[0] * ca - p[2] * sa;
        const z = p[0] * sa + p[2] * ca;
        const y = p[1] * 0.94 - z * 0.26;
        const persp = 1 / (1 + z * 0.36);
        reach.x = Math.max(reach.x, Math.abs(x * persp));
        reach.y = Math.max(reach.y, Math.abs(y * persp));
      }
    }

    const draw = () => {
      const pad = 38;
      const scale = Math.min(
        (width / 2 - pad) / reach.x,
        (height / 2 - pad) / reach.y
      );
      const cx = width / 2;
      const cy = height / 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      const nodes: Node[] = coords.map((p, i) => {
        /* Yaw, then a fixed tilt, so the cloud is read from slightly above
           rather than edge-on - a flat orbit hides one axis entirely. */
        const x = p[0] * cos - p[2] * sin;
        const z = p[0] * sin + p[2] * cos;
        const y = p[1] * 0.94 - z * 0.26;
        const persp = 1 / (1 + z * 0.36);
        return {
          item: items[i],
          base: p,
          sx: cx + x * scale * persp,
          sy: cy + y * scale * persp,
          depth: z,
          r: (2.2 + 2.9 * persp) * (0.72 + 0.55 * (items[i].plays / 1500))
        };
      });
      nodesRef.current = nodes;

      const at = hoverRef.current;
      const lit = at >= 0 ? new Set(neighbourOf[at]) : null;
      const theme = at >= 0 ? items[at].theme : null;

      ctx.clearRect(0, 0, width, height);

      /* Edges first, back to front, so a near point always covers the wire
         that passes behind it. */
      const sorted = [...edges].sort(
        (a, b) => (nodes[a[0]].depth + nodes[a[1]].depth) - (nodes[b[0]].depth + nodes[b[1]].depth)
      );
      for (const [i, j] of sorted) {
        const a = nodes[i];
        const b = nodes[j];
        const near = at >= 0 && (i === at || j === at);
        const fade = 0.5 - (a.depth + b.depth) * 0.16;
        ctx.strokeStyle = near
          ? `rgba(168,216,255,${Math.min(0.95, 0.6 + fade * 0.5)})`
          : `rgba(176,196,222,${Math.max(0.08, 0.3 * fade) * (at >= 0 ? 0.4 : 1)})`;
        ctx.lineWidth = near ? 1.6 : 1;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }

      for (const node of [...nodes].sort((a, b) => b.depth - a.depth)) {
        const i = items.indexOf(node.item);
        const isHover = i === at;
        const isNeighbour = lit?.has(i) ?? false;
        const sameTheme = theme !== null && node.item.theme === theme && !isHover;

        /* Depth is carried by lightness, which is the only channel a chrome
           palette has to spend. Far points sit near the page ground; near
           points go to white. */
        const t = Math.max(0, Math.min(1, 0.5 - node.depth * 0.5));
        const lum = Math.round(92 + 150 * t);
        const dim = at >= 0 && !isHover && !isNeighbour && !sameTheme ? 0.3 : 1;

        if (isHover || isNeighbour) {
          ctx.fillStyle = isHover ? 'rgba(168,216,255,0.22)' : 'rgba(168,216,255,0.13)';
          ctx.beginPath();
          ctx.arc(node.sx, node.sy, node.r * 3.4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = isHover
          ? '#e9f4ff'
          : isNeighbour || sameTheme
            ? `rgba(168,216,255,${0.55 + 0.45 * t})`
            : `rgba(${lum},${lum + 6},${lum + 16},${dim})`;
        ctx.beginPath();
        ctx.arc(node.sx, node.sy, node.r, 0, Math.PI * 2);
        ctx.fill();

        /* A specular pip on the near side of the larger points - the same
            light the rest of the page is lit by, and what makes these read
            as spheres rather than as discs. */
        if (node.r > 3.4 && dim === 1) {
          ctx.fillStyle = `rgba(255,255,255,${0.3 + 0.4 * t})`;
          ctx.beginPath();
          ctx.arc(node.sx - node.r * 0.3, node.sy - node.r * 0.34, node.r * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min(64, now - last);
      last = now;
      /* A bounded swing, not a full turn. The cloud is long along its first
         principal component, so a 360-degree rotation spends most of itself
         edge-on - the figure shrinks to a third of the frame and the spread
         that matters is the one pointing away from the camera. Swinging
         about 26 degrees either side of broadside keeps the principal axis
         across the screen while still moving enough that the depth reads. */
      if (hoverRef.current < 0) {
        phase += dt * 0.00019;
        angle = Math.sin(phase) * SWING;
      }
      draw();
      frame = requestAnimationFrame(tick);
    };

    resize();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(wrap);

    /* Offscreen it draws nothing. A figure a third of the way down the page
       should not be spending a frame budget while someone reads the hero. */
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !still) {
          if (!running) {
            running = true;
            last = performance.now();
            frame = requestAnimationFrame(tick);
          }
        } else {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 }
    );
    io.observe(wrap);

    if (still) running = false;

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
    };
  }, [coords, edges, items, neighbourOf]);

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    let best = -1;
    /* A finger is not a cursor. 20px is a comfortable mouse target and a
       miss on a touchscreen, where there is no pointer to aim with and no
       hover to show you were close. */
    const radius = event.pointerType === 'mouse' ? 20 : 30;
    let bestDist = radius * radius;
    nodesRef.current.forEach((n, i) => {
      const dx = n.sx - px;
      const dy = n.sy - py;
      const d2 = dx * dx + dy * dy;
      if (d2 < bestDist) {
        bestDist = d2;
        best = i;
      }
    });
    hoverRef.current = best;
    setHover(best);
  };

  const clear = () => {
    hoverRef.current = -1;
    setHover(-1);
  };

  /* For a touch pointer, pointerleave fires the moment the finger lifts - so
     clearing on leave unconditionally meant a tap selected an item and then
     deselected it a frame later, and nothing ever appeared. A tap holds its
     selection until the next tap, which is also what a reader expects. */
  const onLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') clear();
  };

  const cosine = (i: number, j: number) =>
    items[i].vec.reduce((t, v, k) => t + v * items[j].vec[k], 0);

  const held = hover >= 0 ? items[hover] : null;

  /* How often an item's nearest neighbour shares its theme. Stated rather
     than asserted, and computed from the same graph that is drawn. */
  const agree = useMemo(
    () => neighbourOf.filter((ns, i) => items[ns[0]].theme === items[i].theme).length,
    [items, neighbourOf]
  );

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-5 mb-7">
        <div>
          <p className="text-[11px] font-mono text-gray-500 mb-2">// the space the model built</p>
          <h4 className="font-display text-xl md:text-2xl font-bold text-white leading-tight">
            Twelve dimensions, seen from the side
          </h4>
        </div>
        <p className="font-mono text-[11px] text-gray-500 leading-relaxed max-w-[25ch]">
          Every item placed by its learned vector, projected onto its three principal components
          and wired to its two nearest neighbours.
        </p>
      </div>

      {/*
        The canvas is paired with a readout rather than left to fill the
        bleed on its own: a point cloud in a 1700px-wide box is mostly empty
        box, and the thing a reader actually wants from a scatter - which
        item is this, and what did the model put next to it - cannot be had
        from a floating tooltip without covering the neighbours it names.
      */}
      <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem] gap-5 max-w-6xl">
        {/* The hover readout is enrichment, not the only route to the
            finding: the sentence under the figure states it, and the matrix
            below gives every pair as numbers. The figure itself therefore
            carries a description rather than pretending to be operable by
            keyboard, which with 36 points in a projection it is not. */}
        <div
          ref={wrapRef}
          onPointerMove={onMove}
          onPointerDown={onMove}
          onPointerLeave={onLeave}
          role="img"
          aria-label={`A rotating three-dimensional projection of ${items.length} item vectors learned by the recommender, each wired to its two nearest neighbours. The items fall into distinct clusters that match their themes, which were never given to the model.`}
          /* pan-y, not none: touch-action: none would have let a finger pick
             a point and nothing else, including scrolling past a box that is
             most of a phone screen. Vertical panning stays with the page and
             a tap still selects. */
          className="relative h-[320px] sm:h-[440px] lg:h-[540px] rounded-[1.5rem] border border-white/10 pane quiet overflow-hidden touch-pan-y"
        >
          <canvas ref={canvasRef} className="absolute inset-0 block" aria-hidden="true" />

          <p className="pointer-events-none absolute bottom-4 left-5 font-mono text-[10px] text-gray-600">
            {hover >= 0 ? 'motion held' : coarse ? 'tap a point' : 'hover a point'}
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 pane quiet p-6 flex flex-col">
          {held ? (
            <>
              <p className="font-mono text-[10px] text-gray-600 mb-2">// selected</p>
              <h5 className="font-display text-lg font-bold text-white leading-tight mb-1">
                {held.name}
              </h5>
              <p className="font-mono text-[11px] text-accent-ink mb-6">{held.theme}</p>

              <dl className="space-y-3 mb-6">
                <div className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-2">
                  <dt className="font-mono text-[10px] text-gray-600">interactions</dt>
                  <dd className="font-mono text-[12px] text-gray-400">
                    {held.plays.toLocaleString('en-GB')}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-2">
                  <dt className="font-mono text-[10px] text-gray-600">popularity rank</dt>
                  <dd className="font-mono text-[12px] text-gray-400">#{held.popRank}</dd>
                </div>
              </dl>

              <p className="font-mono text-[10px] text-gray-600 mb-3">// nearest neighbours</p>
              <ul className="space-y-2">
                {neighbourOf[hover].map(j => (
                  <li key={items[j].id} className="flex items-baseline justify-between gap-3">
                    <span className="text-[12.5px] text-gray-300 min-w-0 truncate">
                      {items[j].name}
                    </span>
                    <span className="font-mono text-[11px] text-accent-ink shrink-0">
                      {cosine(hover, j).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-auto pt-6 font-mono text-[10px] text-gray-600 leading-relaxed">
                cosine on the twelve learned dimensions, not on the projection
              </p>
            </>
          ) : (
            <>
              <p className="font-mono text-[10px] text-gray-600 mb-3">// reading it</p>
              <p className="text-[13px] text-gray-400 leading-relaxed mb-5">
                Each point is one item, placed by the vector the model learned for it. Distance is
                how related the model thinks two things are; nothing about the drawing was chosen
                by hand.
              </p>
              <ul className="space-y-2.5 text-[12.5px] text-gray-500 leading-relaxed">
                <li>
                  <span className="text-gray-300">Size</span> is how often the item was interacted
                  with &mdash; the long tail is the small points.
                </li>
                <li>
                  <span className="text-gray-300">Brightness</span> is depth, nothing more.
                </li>
                <li>
                  <span className="text-gray-300">Wires</span> join each item to the two the model
                  scores closest to it.
                </li>
              </ul>
              <p className="mt-auto pt-6 font-mono text-[10px] text-gray-600 leading-relaxed">
                {coarse ? 'tap' : 'hover'} a point to hold the motion and read its neighbours
              </p>
            </>
          )}
        </div>
      </div>

      {/* The figure has no text of its own, so the finding is written out
          here rather than left for the reader to infer from a drawing. */}
      <p className="mt-5 text-[13px] text-gray-500 leading-relaxed max-w-[62ch]">
        No theme was named anywhere in the training data. The clusters are the only evidence the
        model found one &mdash; and for{' '}
        <span className="text-white font-semibold">
          {agree} of {items.length} items
        </span>{' '}
        the single nearest neighbour it learned shares that item&rsquo;s theme.
      </p>
    </div>
  );
};

export default EmbeddingSpace;
