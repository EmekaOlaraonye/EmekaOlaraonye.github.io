/*
  The page is built almost entirely out of lenses, and until now every one of
  them was looking at the same motionless field. This gives them something to
  bend:

    - a pool of light that follows the pointer, behind the glass rather than
      painted onto it, so the surfaces refract it through the filter they
      already apply to everything else;
    - a slow rotation of the backdrop's hue as you descend, so ten screens of
      glass are not ten screens of the same colour.

  Both are driven from a single animation frame. Writing CSS custom properties
  is the whole of the work here - no element is measured, and no element is
  touched individually. The light reaches every surface through one
  `background-attachment: fixed` gradient declared once in the stylesheet.
*/

/* Degrees of hue the backdrop travels by the middle of the page. A sine
   returns it to the starting violet at the bottom, so the contact section
   bookends the hero rather than landing somewhere arbitrary. */
const AMPLITUDE = 58;

/* How hard the light chases the pointer each frame. Below about 0.2 it
   reads as liquid - something with mass catching up - rather than as a
   cursor decoration welded to the mouse. */
const EASE = 0.13;

/* Pixels. Under this the light has arrived and the frame loop can stop. */
const SETTLED = 0.35;

export function initLiquidLight(): () => void {
  const root = document.documentElement;
  const ambient = document.querySelector<HTMLElement>('.ambient');

  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  const plain = window.matchMedia('(prefers-reduced-transparency: reduce)');

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let lightX = targetX;
  let lightY = targetY;
  let shift = 0;
  let frame = 0;
  let scrollPending = false;

  const live = () => fine.matches && !calm.matches && !plain.matches;

  const tick = () => {
    frame = 0;
    let again = false;

    if (scrollPending && ambient) {
      scrollPending = false;
      const travel = root.scrollHeight - window.innerHeight;
      const progress = travel > 0 ? Math.min(1, Math.max(0, window.scrollY / travel)) : 0;
      const next = AMPLITUDE * Math.sin(progress * Math.PI);
      /* Sub-degree changes are invisible but still repaint a full-viewport
         layer that every glass surface samples. */
      if (Math.abs(next - shift) > 0.4) {
        shift = next;
        ambient.style.setProperty('--amb-shift', `${next.toFixed(1)}deg`);
      }
    }

    const dx = targetX - lightX;
    const dy = targetY - lightY;
    if (Math.abs(dx) > SETTLED || Math.abs(dy) > SETTLED) {
      lightX += dx * EASE;
      lightY += dy * EASE;
      root.style.setProperty('--lx', `${lightX.toFixed(1)}px`);
      root.style.setProperty('--ly', `${lightY.toFixed(1)}px`);
      again = true;
    }

    if (again || scrollPending) schedule();
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(tick);
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!live()) return;
    targetX = event.clientX;
    targetY = event.clientY;
    root.setAttribute('data-lit', '1');
    schedule();
  };

  /* Leaving the window should put the light out rather than strand it at the
     edge of the screen. */
  const onPointerLeave = () => root.removeAttribute('data-lit');

  const onScroll = () => {
    if (!live()) return;
    scrollPending = true;
    schedule();
  };

  const onPreferenceChange = () => {
    if (!live()) {
      root.removeAttribute('data-lit');
      ambient?.style.removeProperty('--amb-shift');
      shift = 0;
    } else {
      scrollPending = true;
      schedule();
    }
  };

  if (live()) {
    scrollPending = true;
    schedule();
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('pointerleave', onPointerLeave);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  fine.addEventListener('change', onPreferenceChange);
  calm.addEventListener('change', onPreferenceChange);
  plain.addEventListener('change', onPreferenceChange);

  return () => {
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerleave', onPointerLeave);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    fine.removeEventListener('change', onPreferenceChange);
    calm.removeEventListener('change', onPreferenceChange);
    plain.removeEventListener('change', onPreferenceChange);
    root.removeAttribute('data-lit');
  };
}
