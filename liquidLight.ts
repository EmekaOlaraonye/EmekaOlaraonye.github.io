/*
  The page is built almost entirely out of lenses, and until now every one of
  them was looking at the same motionless field. This gives them something to
  bend:

    - a pool of light that follows the pointer, behind the glass rather than
      painted onto it, so the surfaces refract it through the filter they
      already apply to everything else;
    - a slow rotation of the backdrop's hue as you descend, so ten screens of
      glass are not ten screens of the same colour;
    - the cursor, which is the same two numbers drawn twice: a bead at the
      raw pointer position and a ring at the eased one, so the trail behind
      it is the light's own weight rather than a second effect imitating it.

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

/* What the ring opens over. Text fields are tested first and win, because an
   input matches both and should keep its caret. */
const TEXTUAL =
  'input:not([type=button]):not([type=submit]):not([type=reset])' +
  ':not([type=checkbox]):not([type=radio]), textarea, [contenteditable="true"]';

const ACTIONABLE =
  'a[href], button, input, select, summary, label[for], canvas,' +
  '[role="button"], [tabindex]:not([tabindex="-1"])';

export function initLiquidLight(): () => void {
  const root = document.documentElement;
  const ambient = document.querySelector<HTMLElement>('.ambient');
  const bead = document.querySelector<HTMLElement>('.cursor-bead');
  const progress = document.querySelector<HTMLElement>('.nav-progress');

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
  let beadPending = false;
  let progressPending = false;
  let travelled = -1;

  const live = () => fine.matches && !calm.matches && !plain.matches;

  const tick = () => {
    frame = 0;
    let again = false;

    /* How far down the page we are. Outside the live() gate on purpose:
       this is information, not decoration, and someone on reduced motion
       still wants to know a thirteen-screen page is thirteen screens. */
    if (progressPending) {
      progressPending = false;
      const travel = root.scrollHeight - window.innerHeight;
      const next = travel > 0 ? Math.min(1, Math.max(0, window.scrollY / travel)) : 0;
      /* A line 1400px wide cannot show a change of under a thousandth, and
         writing anyway would invalidate it on every frame of a slow scroll. */
      if (progress && Math.abs(next - travelled) > 0.001) {
        travelled = next;
        progress.style.setProperty('--progress', next.toFixed(4));
      }
    }

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

      /* Parallax. The two star tiles drift at different rates, so the field
         has depth rather than being a texture pinned to the glass. Set on
         body rather than :root: body::before is the only thing that reads
         them, and writing to :root would invalidate the whole tree. */
      const y = window.scrollY;
      document.body.style.setProperty('--star-a', `${(-y * 0.06).toFixed(1)}px`);
      document.body.style.setProperty('--star-b', `${(90 - y * 0.15).toFixed(1)}px`);
    }

    /* The bead sits on the pointer itself. Written here rather than in the
       event so a burst of pointermoves still costs one write, and written
       onto the bead rather than onto :root - a custom property set on the
       root invalidates every element that could inherit it, which is the
       whole tree, twice a frame, to move one 7px dot. The ring keeps
       reading --lx/--ly because the light pays for those already. */
    if (beadPending && bead) {
      beadPending = false;
      bead.style.setProperty('--x', `${targetX}px`);
      bead.style.setProperty('--y', `${targetY}px`);
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
    beadPending = true;
    root.setAttribute('data-lit', '1');
    schedule();
  };

  /* Leaving the window should put the light out rather than strand it at the
     edge of the screen. */
  const onPointerLeave = () => root.removeAttribute('data-lit');

  /* One delegated listener rather than a handler per control, so adding a
     button anywhere on the page needs nothing here. */
  const onPointerOver = (event: PointerEvent) => {
    if (!live()) return;
    const target = event.target as Element | null;
    if (!target || typeof target.closest !== 'function') return;
    root.dataset.cursor = target.closest(TEXTUAL)
      ? 'text'
      : target.closest(ACTIONABLE)
        ? 'act'
        : 'on';
  };

  const onScroll = () => {
    progressPending = true;
    if (live()) scrollPending = true;
    schedule();
  };

  const onPreferenceChange = () => {
    if (!live()) {
      root.removeAttribute('data-cursor');
      root.removeAttribute('data-lit');
      ambient?.style.removeProperty('--amb-shift');
      shift = 0;
    } else {
      root.dataset.cursor = 'on';
      scrollPending = true;
      schedule();
    }
  };

  progressPending = true;
  schedule();

  if (live()) {
    /* Only now is the system cursor hidden. Until this line runs the page
       has an ordinary arrow, which is what a visitor with no JavaScript,
       a touchscreen or reduced motion keeps. */
    root.dataset.cursor = 'on';
    scrollPending = true;
    schedule();
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('pointerover', onPointerOver, { passive: true });
  document.addEventListener('pointerleave', onPointerLeave);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  fine.addEventListener('change', onPreferenceChange);
  calm.addEventListener('change', onPreferenceChange);
  plain.addEventListener('change', onPreferenceChange);

  return () => {
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerover', onPointerOver);
    document.removeEventListener('pointerleave', onPointerLeave);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    fine.removeEventListener('change', onPreferenceChange);
    calm.removeEventListener('change', onPreferenceChange);
    plain.removeEventListener('change', onPreferenceChange);
    root.removeAttribute('data-lit');
    root.removeAttribute('data-cursor');
  };
}
