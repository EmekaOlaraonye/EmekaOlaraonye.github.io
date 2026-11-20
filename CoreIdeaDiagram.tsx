import React from 'react';

/*
  The difference between the two models, drawn.

  This block used to be chips and arrows - "user · item → score" set in
  type - which states the difference without showing it. The thing that
  actually separates the two is shape: matrix factorisation collapses two
  vectors through one fixed operation, while neural collaborative
  filtering pushes them through layers it has learned. That is a picture,
  and in a section whose own heading is "the core idea, in one picture" it
  ought to be one.

  Drawn rather than described, and small: it sits in a 493px column beside
  the research card, so it has to read at about a third of that.
*/
const CELL = 11;
const GAP = 3;

const Vector = ({ x, y, n = 4, fill }: { x: number; y: number; n?: number; fill: string }) => (
  <g>
    {Array.from({ length: n }, (_, i) => (
      <rect
        key={i}
        x={x}
        y={y + i * (CELL + GAP)}
        width={CELL}
        height={CELL}
        rx={2.5}
        fill={fill}
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="0.75"
      />
    ))}
  </g>
);

const Arrow = ({ from, to, y }: { from: number; to: number; y: number }) => (
  <g stroke="rgba(195,209,226,0.55)" strokeWidth="1.1" fill="none">
    <line x1={from} y1={y} x2={to - 4} y2={y} />
    <path d={`M ${to - 5} ${y - 3} L ${to} ${y} L ${to - 5} ${y + 3}`} strokeLinejoin="round" />
  </g>
);

const LABEL = { fontSize: 7.5, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em' };

const CoreIdeaDiagram = () => {
  const top = 9;
  const mid = top + (4 * CELL + 3 * GAP) / 2;
  const nodes = [0, 1, 2];

  return (
    <div className="space-y-3">
      {/* Matrix factorisation: one fixed operation */}
      <figure className="rounded-2xl border border-white/10 bg-dark/60 p-4 m-0">
        <figcaption className="font-mono text-[10px] text-gray-500 mb-3">matrix factorization</figcaption>
        <svg viewBox="0 0 196 78" className="w-full h-auto" role="img"
             aria-label="A user vector and an item vector combined by a fixed dot product into a single score.">
          <Vector x={8} y={top} fill="rgba(146,167,194,0.3)" />
          <text x={13.5} y={74} fill="#8f9aaa" textAnchor="middle" {...LABEL}>user</text>
          <text x={40} y={mid + 3} fill="#c3d1e2" textAnchor="middle" fontSize="12">·</text>
          <Vector x={56} y={top} fill="rgba(146,167,194,0.3)" />
          <text x={61.5} y={74} fill="#8f9aaa" textAnchor="middle" {...LABEL}>item</text>
          <Arrow from={80} to={112} y={mid} />
          <text x={96} y={mid - 7} fill="#8f9aaa" textAnchor="middle" {...LABEL}>fixed</text>
          <rect x={118} y={mid - 7.5} width={15} height={15} rx={3}
                fill="rgba(146,167,194,0.42)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.75" />
          <text x={125.5} y={74} fill="#8f9aaa" textAnchor="middle" {...LABEL}>score</text>
        </svg>
        <p className="text-[12px] text-gray-500 mt-3 leading-relaxed">
          A fixed inner product. The interaction is assumed, never learned.
        </p>
      </figure>

      {/* NCF: the operation itself is learned */}
      <figure className="rounded-2xl border border-accent/40 bg-accent/10 p-4 m-0">
        <figcaption className="font-mono text-[10px] text-accent-ink mb-3">neural collaborative filtering</figcaption>
        <svg viewBox="0 0 196 78" className="w-full h-auto" role="img"
             aria-label="A user vector and an item vector passed through two learned layers, which produce the score.">
          <Vector x={8} y={top} fill="rgba(168,216,255,0.26)" />
          <text x={13.5} y={74} fill="#8f9aaa" textAnchor="middle" {...LABEL}>user</text>
          <Vector x={30} y={top} fill="rgba(168,216,255,0.26)" />
          <text x={35.5} y={74} fill="#8f9aaa" textAnchor="middle" {...LABEL}>item</text>
          <Arrow from={48} to={70} y={mid} />
          {/* two learned layers - the part matrix factorisation does not have */}
          <g>
            {[76, 104].map(cx =>
              nodes.map(j => (
                <circle key={`${cx}-${j}`} cx={cx} cy={top + 6 + j * 14} r={4.4}
                        fill="rgba(168,216,255,0.5)" stroke="rgba(168,216,255,0.75)" strokeWidth="0.8" />
              ))
            )}
            {nodes.map(a =>
              nodes.map(c => (
                <line key={`${a}-${c}`} x1={80.4} y1={top + 6 + a * 14} x2={99.6} y2={top + 6 + c * 14}
                      stroke="rgba(168,216,255,0.28)" strokeWidth="0.6" />
              ))
            )}
          </g>
          <text x={90} y={74} fill="#a8d8ff" textAnchor="middle" {...LABEL}>learned f()</text>
          <Arrow from={112} to={136} y={mid} />
          <rect x={142} y={mid - 7.5} width={15} height={15} rx={3}
                fill="rgba(168,216,255,0.55)" stroke="rgba(168,216,255,0.8)" strokeWidth="0.75" />
          <text x={149.5} y={74} fill="#8f9aaa" textAnchor="middle" {...LABEL}>score</text>
        </svg>
        <p className="text-[12px] text-gray-400 mt-3 leading-relaxed">
          The network learns the interaction function itself &mdash; free to model relationships a dot
          product cannot express.
        </p>
      </figure>
    </div>
  );
};

export default CoreIdeaDiagram;
