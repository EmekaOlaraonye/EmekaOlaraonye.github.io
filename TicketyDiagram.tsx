import React from 'react';

/*
  Tickety has no interface to photograph, so its "screenshot" is the thing that
  actually makes it interesting: where the trust boundary sits. Clients hold
  none of the authority - only the service can mint a role.

  Drawn inline rather than as an image file so it inherits the theme tokens and
  stays sharp at any size. The viewBox is kept narrow on purpose: the card only
  gives it ~360px, so a wider box would scale the labels down below reading size.
*/
const TicketyDiagram = () => (
  <svg
    viewBox="0 0 330 250"
    className="w-full h-auto"
    role="img"
    aria-label="Architecture: Flutter and React clients sit outside a trust boundary; a Fastify service on Cloud Run is the only thing that can set custom claims, and it reads and writes Firestore."
  >
    <text x="2" y="12" className="fill-gray-500 font-mono" fontSize="10">// untrusted</text>

    <rect x="2" y="24" width="104" height="44" rx="8" className="fill-dark stroke-white/15" strokeWidth="1" />
    <text x="14" y="44" className="fill-gray-300 font-mono" fontSize="11.5">Flutter app</text>
    <text x="14" y="58" className="fill-gray-600 font-mono" fontSize="9">scanner · attendee</text>

    <rect x="2" y="80" width="104" height="44" rx="8" className="fill-dark stroke-white/15" strokeWidth="1" />
    <text x="14" y="100" className="fill-gray-300 font-mono" fontSize="11.5">React admin</text>
    <text x="14" y="114" className="fill-gray-600 font-mono" fontSize="9">organizer console</text>

    {/* the boundary */}
    <line x1="126" y1="6" x2="126" y2="228" className="stroke-accent" strokeWidth="1.5" strokeDasharray="5 5" />
    <text x="122" y="243" className="fill-accent-ink font-mono" fontSize="10" textAnchor="middle">trust boundary</text>

    <path d="M106 46 H144" className="stroke-gray-600" strokeWidth="1.3" fill="none" markerEnd="url(#tip)" />
    <path d="M106 102 H144" className="stroke-gray-600" strokeWidth="1.3" fill="none" markerEnd="url(#tip)" />

    {/* the service - the only thing that can grant a role */}
    <rect x="148" y="20" width="180" height="104" rx="10" className="fill-surface-accent stroke-brand/50" strokeWidth="1.5" />
    <text x="160" y="42" className="fill-white font-mono" fontSize="12.5">Fastify · Cloud Run</text>
    <text x="160" y="64" className="fill-gray-400 font-mono" fontSize="9.5">sole issuer of custom claims</text>
    <text x="160" y="82" className="fill-gray-400 font-mono" fontSize="9.5">auth runs pre-parsing</text>
    <text x="160" y="100" className="fill-gray-400 font-mono" fontSize="9.5">strips secrets per route</text>

    <path d="M238 124 V158" className="stroke-gray-600" strokeWidth="1.3" fill="none" markerEnd="url(#tip)" />

    <rect x="148" y="162" width="180" height="48" rx="10" className="fill-dark stroke-white/15" strokeWidth="1" />
    <text x="160" y="182" className="fill-gray-300 font-mono" fontSize="11.5">Firestore</text>
    <text x="160" y="198" className="fill-gray-600 font-mono" fontSize="9">events · tickets · sales</text>

    {/* the exception the model has to live with */}
    <path d="M54 124 V198 H144" className="stroke-gray-700" strokeWidth="1" strokeDasharray="3 4" fill="none" markerEnd="url(#tipDim)" />
    <text x="60" y="190" className="fill-gray-600 font-mono" fontSize="8.5">limited reads</text>

    <defs>
      <marker id="tip" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
        <path d="M0 0 L6 3 L0 6 z" className="fill-gray-600" />
      </marker>
      <marker id="tipDim" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
        <path d="M0 0 L6 3 L0 6 z" className="fill-gray-700" />
      </marker>
    </defs>
  </svg>
);

export default TicketyDiagram;
