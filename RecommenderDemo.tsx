import React, { useMemo, useState } from 'react';
import { RotateCcw, TrendingUp, Sparkles, Info } from 'lucide-react';
import { REC_ITEMS, RecItem } from './recsysData';

const MAX_PICKS = 4;
const TOP_N = 5;

/*
  Interleave the catalogue so themed items are not presented in blocks - the
  clustering should be something the model reveals, not something the layout
  gives away.
*/
const SHUFFLED: RecItem[] = (() => {
  const byTheme = new Map<string, RecItem[]>();
  REC_ITEMS.forEach(item => {
    const bucket = byTheme.get(item.theme) ?? [];
    bucket.push(item);
    byTheme.set(item.theme, bucket);
  });
  const buckets = [...byTheme.values()];
  const out: RecItem[] = [];
  for (let i = 0; out.length < REC_ITEMS.length; i++) {
    buckets.forEach(b => {
      if (b[i]) out.push(b[i]);
    });
  }
  return out;
})();

const POPULARITY_RANKED = [...REC_ITEMS].sort((a, b) => b.plays - a.plays);

const dot = (a: number[], b: number[]) => a.reduce((sum, v, i) => sum + v * b[i], 0);

const ResultList = ({
  items,
  tone,
  label,
  icon,
  note
}: {
  items: RecItem[];
  tone: 'muted' | 'brand';
  label: string;
  icon: React.ReactNode;
  note: string;
}) => (
  <div
    className={`rounded-2xl border p-5 ${
      tone === 'brand' ? 'border-accent/40 bg-accent/[0.07]' : 'border-white/10 bg-dark/50'
    }`}
  >
    <div className="flex items-center gap-2 mb-1">
      <span className={tone === 'brand' ? 'text-accent-ink' : 'text-gray-500'}>{icon}</span>
      <p className={`text-[11px] font-mono ${tone === 'brand' ? 'text-accent-ink' : 'text-gray-500'}`}>{label}</p>
    </div>
    <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">{note}</p>

    <ol className="space-y-2">
      {items.map((item, i) => (
        <li
          key={item.id}
          className="flex items-center gap-3 rounded-lg bg-surface/70 border border-white/5 px-3 py-2"
        >
          <span className="font-mono text-[10px] text-gray-600 w-3 shrink-0">{i + 1}</span>
          <span className="text-[13px] text-gray-300 flex-1 min-w-0 truncate">{item.name}</span>
          <span
            className={`font-mono text-[10px] shrink-0 px-1.5 py-0.5 rounded ${
              item.popRank <= 8
                ? 'text-gray-500 bg-white/5'
                : 'text-accent-ink bg-accent/15'
            }`}
            title={`Ranked #${item.popRank} of ${REC_ITEMS.length} by raw popularity`}
          >
            #{item.popRank}
          </span>
        </li>
      ))}
    </ol>
  </div>
);

const RecommenderDemo = () => {
  const [picked, setPicked] = useState<string[]>(['burr-grinder']);

  const toggle = (id: string) => {
    setPicked(prev => {
      if (prev.includes(id)) return prev.filter(p => p !== id);
      if (prev.length >= MAX_PICKS) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const { popular, learned, reach } = useMemo(() => {
    const pickedSet = new Set(picked);

    const popular = POPULARITY_RANKED.filter(it => !pickedSet.has(it.id)).slice(0, TOP_N);

    if (picked.length === 0) {
      return { popular, learned: [] as RecItem[], reach: null };
    }

    // Fold the visitor in as a new user: sum the vectors of what they chose.
    // The vectors are L2-normalised, so the dot product below is a cosine.
    const dim = REC_ITEMS[0].vec.length;
    const user = new Array(dim).fill(0);
    REC_ITEMS.forEach(item => {
      if (pickedSet.has(item.id)) {
        item.vec.forEach((v, i) => { user[i] += v; });
      }
    });
    const norm = Math.hypot(...user) || 1;
    const userVec = user.map(v => v / norm);

    const learned = REC_ITEMS
      .filter(it => !pickedSet.has(it.id))
      .map(it => ({ item: it, score: dot(userVec, it.vec) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_N)
      .map(s => s.item);

    const mean = (xs: RecItem[]) => xs.reduce((s, i) => s + i.popRank, 0) / (xs.length || 1);

    return {
      popular,
      learned,
      reach: { popularity: mean(popular), model: mean(learned) }
    };
  }, [picked]);

  return (
    <div className="rounded-[2rem] bg-surface border border-white/10 p-7 md:p-9">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
        <div>
          <p className="text-[11px] font-mono text-gray-500 mb-2">// try it yourself</p>
          <h4 className="font-display text-xl md:text-2xl font-bold text-white leading-tight">
            Popularity vs. a learned model
          </h4>
        </div>
        <span className="text-[10px] font-mono text-accent-ink bg-accent/15 border border-accent/30 px-2.5 py-1 rounded-full shrink-0">
          toy demo
        </span>
      </div>

      <p className="text-sm text-gray-400 leading-relaxed mb-7 max-w-xl">
        Pick a few things you&rsquo;d actually buy. The left column ranks by raw popularity, the right by
        the learned item embeddings. Watch what happens to the tail.
      </p>

      {/* Catalogue */}
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-[11px] font-mono text-gray-500">
          catalogue · {picked.length}/{MAX_PICKS} selected
        </p>
        <button
          onClick={() => setPicked([])}
          className="inline-flex items-center gap-1.5 py-2 text-[11px] font-mono text-gray-500 hover:text-white transition-colors"
        >
          <RotateCcw size={11} /> clear
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {SHUFFLED.map(item => {
          const on = picked.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              aria-pressed={on}
              className={`px-3 py-2 rounded-lg text-[12px] transition-all border ${
                on
                  ? 'bg-brand text-on-brand border-brand font-medium'
                  : 'bg-dark border-white/10 text-gray-400 hover:text-white hover:border-white/30'
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      {/* Results */}
      {picked.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center">
          <p className="text-sm text-gray-500">Pick at least one item to see the two rankings diverge.</p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <ResultList
              items={popular}
              tone="muted"
              label="ranked by popularity"
              icon={<TrendingUp size={13} />}
              note="Ignores who you are. Returns the same head items to everybody."
            />
            <ResultList
              items={learned}
              tone="brand"
              label="ranked by learned embeddings"
              icon={<Sparkles size={13} />}
              note="Scores your taste vector against every item. Reaches into the tail."
            />
          </div>

          {reach && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-dark/50 p-5">
              <p className="text-[11px] font-mono text-gray-500 mb-3">// average popularity rank of what each returned</p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                <div>
                  <span className="font-display text-2xl font-bold text-gray-400">
                    #{reach.popularity.toFixed(1)}
                  </span>
                  <span className="text-[11px] font-mono text-gray-500 ml-2">popularity</span>
                </div>
                <div>
                  <span className="font-display text-2xl font-bold text-accent-ink">
                    #{reach.model.toFixed(1)}
                  </span>
                  <span className="text-[11px] font-mono text-gray-500 ml-2">learned model</span>
                </div>
                <p className="text-[12px] text-gray-400 leading-relaxed flex-1 min-w-[220px]">
                  A higher number means it is recommending items that fewer people have touched &mdash; which is
                  exactly the discovery that a popularity ranker cannot do.
                </p>
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-6 flex gap-2.5 text-[11px] text-gray-500 leading-relaxed">
        <Info size={13} className="shrink-0 mt-0.5" />
        <p>
          Illustrates the idea behind my research; it is not a result from it. The vectors come from a BPR
          matrix-factorization model I trained offline on a <span className="text-gray-400">synthetic</span> dataset
          of 4,000 users over {REC_ITEMS.length} items, then folded your picks in as a new user. Everything runs in
          your browser.
        </p>
      </div>
    </div>
  );
};

export default RecommenderDemo;
