import React, { useEffect, useRef, useState } from 'react';
import { Droplets, X } from 'lucide-react';

const KEY = 'glass-strength';
const DEFAULT = 60;
/* How far the lens bends the backdrop at full strength, in px. Past roughly
   this the rim starts to smear rather than refract. */
const MAX_DISPLACE = 28;

const readStored = (): number => {
  try {
    const v = Number(window.localStorage.getItem(KEY));
    if (Number.isFinite(v) && v >= 0 && v <= 100) return v;
  } catch {
    // storage unavailable - fall through to the default
  }
  return DEFAULT;
};

/*
  Adjustable liquid glass, the way Apple exposes transparency as a setting
  rather than a fixed choice.

  One value drives three things: the SVG lens scale (an attribute, so it is
  set on the node directly), and two CSS custom properties that the .liquid
  class uses for its tint and specular rim.
*/
const GlassControl = ({ compact = false }: { compact?: boolean }) => {
  const [open, setOpen] = useState(false);
  const [strength, setStrength] = useState<number>(readStored);
  const [supported, setSupported] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSupported(
      typeof CSS !== 'undefined' && CSS.supports('backdrop-filter', 'url(#liquid-glass)')
    );
  }, []);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-transparency: reduce)').matches;
    const effective = reduced ? 0 : strength;

    const f = effective / 100;
    document.documentElement.style.setProperty('--liquid-strength', String(f));

    // A backdrop-filter of blur(0px) still runs the whole pipeline, so at zero
    // the property is removed rather than set to a no-op. That is the
    // difference between 53fps and 32fps on a full-page scroll.
    document.documentElement.style.setProperty(
      '--liquid-filter',
      f === 0
        ? 'none'
        : `url(#liquid-glass) blur(${(3 * f).toFixed(2)}px) saturate(${(1 + 0.8 * f).toFixed(2)}) brightness(${(1 + 0.16 * f).toFixed(2)})`
    );

    document.getElementById('liquid-displace')?.setAttribute('scale', String(f * MAX_DISPLACE));

    try {
      window.localStorage.setItem(KEY, String(strength));
    } catch {
      // preference simply will not persist
    }
  }, [strength]);

  // close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const label = strength === 0 ? 'off' : strength < 35 ? 'subtle' : strength < 70 ? 'medium' : 'full';

  return (
    <div ref={wrapRef} className={compact ? 'relative' : 'relative'}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={`Glass intensity: ${label}. Adjust.`}
        title={`Glass: ${label}`}
        className="p-2.5 rounded-full liquid border border-white/10 text-gray-400 hover:text-white hover:border-white/30 active:scale-90 transition-all"
      >
        <Droplets size={16} />
      </button>

      {open && (
        <div
          className={`absolute ${compact ? 'bottom-full mb-3 right-0' : 'top-full mt-3 right-0'} w-64 rounded-2xl liquid border border-white/15 p-4 z-50`}
          role="group"
          aria-label="Glass intensity"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[11px] text-brand">// liquid glass</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close glass settings"
              className="p-1 -m-1 text-gray-500 hover:text-white transition-colors"
            >
              <X size={13} />
            </button>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={strength}
            onChange={e => setStrength(Number(e.target.value))}
            aria-label="Glass intensity"
            className="w-full accent-brand cursor-pointer"
          />

          <div className="flex items-center justify-between mt-2 font-mono text-[10px] text-gray-500">
            <span>off</span>
            <span className="text-accent-ink">{label} · {strength}%</span>
            <span>full</span>
          </div>

          <p className="mt-3 text-[11px] text-gray-500 leading-relaxed">
            {supported
              ? 'Bends the backdrop at the rim of each panel, the way light passes through thick glass.'
              : 'Your browser does not support backdrop refraction, so this adjusts tint and edge light only.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default GlassControl;
