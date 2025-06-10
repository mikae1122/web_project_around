import { Popup } from "./popup.js";

export default class PopupWithConfirmation extends Popup {
  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners(
      ".popup__confirm",
      ".popup__close-cartaobuttonimg",
      ".botao__de-fechar"
    );
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleSubmit) {
        this._handleSubmit();
      }
    });
  }
}
