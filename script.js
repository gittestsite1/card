(function () {
  const card = document.getElementById("card");
  const reducesMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!card || reducesMotion || window.matchMedia("(pointer: coarse)").matches) return;

  let raf = 0;
  let bx = 0;
  let by = 0;
  let mx = 0;
  let my = 0;

  function tick() {
    raf = 0;
    bx += (mx - bx) * 0.08;
    by += (my - by) * 0.08;
    const rx = (by / 14).toFixed(8);
    const ry = (-bx / 14).toFixed(8);
    card.style.transform =
      "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
  }

  function onMove(ev) {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mx = (ev.clientX - cx) / (rect.width / 2);
    my = (ev.clientY - cy) / (rect.height / 2);
    mx = Math.max(-1, Math.min(1, mx));
    my = Math.max(-1, Math.min(1, my));
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function onLeave() {
    mx = 0;
    my = 0;
    if (!raf) raf = requestAnimationFrame(tick);
  }

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("mouseleave", onLeave);
})();
