import { Popup } from "./popup.js";

export default class PopupWithConfirmation extends Popup {
  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners(
      ".main__interacao-botao",
      ".popup__close-cartaobuttonimg"
    );
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleSubmit) {
        this._handleSubmit();
      }
    });
  }
}
