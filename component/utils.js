export function showOverlay() {
  const overlay = document.querySelector(".overlay");
  if (overlay) overlay.classList.add("overlay-ativo");
}

export function hideOverlay() {
  const overlay = document.querySelector(".overlay");
  if (overlay) overlay.classList.remove("overlay-ativo");
}
