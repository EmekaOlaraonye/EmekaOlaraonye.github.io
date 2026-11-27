/*
  Cards that turn to face the pointer.

  The project cards were the flattest thing left on the page: one plane,
  one border, no separation from the starfield behind them. They are also
  the part an employer spends the longest on, so they are worth the depth.

  Two planes, not one. The card rotates a few degrees toward the pointer,
  and the screenshot or diagram inside it is pushed forward on Z, so it
  parallaxes against its own card as you move. A single rotating plane
  reads as a sheet of paper being tipped; two planes read as a thing with
  a front and a back, which is the whole point of doing this at all.

  Delegated from the document rather than bound per card, so the cards
  stay plain markup and nothing has to be re-bound when React re-renders
  them. The rectangle is measured once on entry rather than per frame -
  reading it inside the move handler would force a layout on every
  pointermove, which is exactly the cost this effect cannot afford.
*/

/* Degrees at the corner. Small on purpose: past about four it stops
   reading as depth and starts reading as a slide transition. */
const MAX = 3.2;

export function initTilt(): () => void {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)');

  let card: HTMLElement | null = null;
  let box: DOMRect | null = null;
  let px = 0;
  let py = 0;
  let frame = 0;

  const live = () => fine.matches && !calm.matches;

  const clear = () => {
    if (!card) return;
    card.style.removeProperty('--tilt-x');
    card.style.removeProperty('--tilt-y');
    card.removeAttribute('data-tilting');
    card = null;
    box = null;
  };

  const tick = () => {
    frame = 0;
    if (!card || !box) return;
    const nx = (px - box.left) / box.width - 0.5;
    const ny = (py - box.top) / box.height - 0.5;
    /* Y rotation follows horizontal travel, X rotation opposes vertical
       travel - otherwise the card tips away from the pointer and the
       parallax runs backwards. */
    card.style.setProperty('--tilt-x', `${(-ny * 2 * MAX).toFixed(2)}deg`);
    card.style.setProperty('--tilt-y', `${(nx * 2 * MAX).toFixed(2)}deg`);
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!live()) return;
    const target = event.target as Element | null;
    const next = target && typeof target.closest === 'function'
      ? target.closest<HTMLElement>('[data-tilt]')
      : null;

    if (next !== card) {
      clear();
      card = next;
      if (card) {
        box = card.getBoundingClientRect();
        card.setAttribute('data-tilting', '');
      }
    }

    if (!card) return;
    px = event.clientX;
    py = event.clientY;
    if (!frame) frame = requestAnimationFrame(tick);
  };

  /* A card scrolled out from under a resting pointer would otherwise keep
     the rectangle it was measured at and tilt from stale numbers. */
  const onInvalidate = () => {
    if (card) box = card.getBoundingClientRect();
  };

  const onPreferenceChange = () => {
    if (!live()) clear();
  };

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('scroll', onInvalidate, { passive: true });
  window.addEventListener('resize', onInvalidate, { passive: true });
  fine.addEventListener('change', onPreferenceChange);
  calm.addEventListener('change', onPreferenceChange);

  return () => {
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('scroll', onInvalidate);
    window.removeEventListener('resize', onInvalidate);
    fine.removeEventListener('change', onPreferenceChange);
    calm.removeEventListener('change', onPreferenceChange);
    clear();
  };
}
