import React from 'react';

/*
  A window around the screenshots.

  The shots were sitting in a plain bordered box, which told a reader
  nothing about what they were looking at. In a frame they read as a
  running product rather than as a picture, and the frame gives the card a
  second plane to sit on - the thing the page was missing.

  The title bar is the same brushed metal as the headlines, which is the
  reason this device belongs here rather than being a borrowed macOS
  motif: on a chrome-themed page a metal window chrome is native.

  The address only appears when the project actually has a live URL. Motora
  has no deployment, so inventing a plausible-looking address for the
  screenshot would be a small lie told in a convincing typeface.
*/
const BrowserFrame = ({ host, children }: { host?: string; children: React.ReactNode }) => (
  <div className="rounded-xl overflow-hidden border border-white/12 bg-dark shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)]">
    <div className="browser-chrome flex items-center gap-2 px-3 py-2 border-b border-white/10">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-white/35" />
        <span className="h-2 w-2 rounded-full bg-white/22" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
      </span>
      {host && (
        <span className="ml-1.5 min-w-0 truncate rounded px-2 py-0.5 bg-black/30 font-mono text-[10px] text-gray-400">
          {host}
        </span>
      )}
    </div>
    {children}
  </div>
);

export default BrowserFrame;
