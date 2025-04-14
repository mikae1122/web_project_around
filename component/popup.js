export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup__relative");
    showOverlay();
  }

  close() {
    this._popup.classList.remove("popup__relative");
    hideOverlay();
  }

  setEventListeners(triggerSelector, closeSelector) {
    const trigger = document.querySelector(triggerSelector);
    const close = this._popup.querySelector(closeSelector);

    trigger.addEventListener("click", () => this.open());
    close.addEventListener("click", () => this.close());
  }
}
