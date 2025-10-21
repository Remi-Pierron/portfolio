document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('section'));
  if (!sections.length) return;

  const add = el => el.classList.add('is-hovered');
  const remove = el => el.classList.remove('is-hovered');

  sections.forEach(sec => {
    // Mouse
    sec.addEventListener('mouseenter', () => add(sec));
    sec.addEventListener('mouseleave', () => remove(sec));

    // Keyboard focus within the section
    sec.addEventListener('focusin', () => add(sec));
    sec.addEventListener('focusout', e => {
      if (!sec.contains(e.relatedTarget)) remove(sec);
    });

    // Touch: brief highlight on tap
    let touchTimer;
    sec.addEventListener('touchstart', () => {
      add(sec);
      clearTimeout(touchTimer);
      touchTimer = setTimeout(() => remove(sec), 20);
    }, { passive: true });

    sec.addEventListener('touchend', () => {
      clearTimeout(touchTimer);
      touchTimer = setTimeout(() => remove(sec), 20);
    });
    sec.addEventListener('touchcancel', () => remove(sec));
  });
});
