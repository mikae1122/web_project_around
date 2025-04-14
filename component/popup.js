import { showOverlay, hideOverlay } from "./utils.js";

export class Popup {
  constructor(popupSelector, activeClass) {
    this._popup = document.querySelector(popupSelector);
    this._activeClass = activeClass;

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  open() {
    this._popup.classList.add(this._activeClass);
    showOverlay();
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._handleOutsideClick);
  }

  close() {
    this._popup.classList.remove(this._activeClass);
    hideOverlay();
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._handleOutsideClick);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOutsideClick(event) {
    if (!this._popup.contains(event.target)) {
      this.close();
    }
  }

  setEventListeners(triggerSelector, closeSelector) {
    const trigger = document.querySelector(triggerSelector);
    const close = this._popup.querySelector(closeSelector);

    if (trigger) {
      trigger.addEventListener("click", () => this.open());
    }

    if (close) {
      close.addEventListener("click", (event) => {
        event.stopPropagation();
        this.close();
      });
    }
  }
}
