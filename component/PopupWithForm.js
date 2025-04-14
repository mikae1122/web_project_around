import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, activeClass, handleFormSubmit) {
    super(popupSelector, activeClass);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
    this._inputList = this._form.querySelectorAll("input");
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value.trim();
    });
    return formValues;
  }

  setEventListeners(triggerSelector, closeSelector) {
    super.setEventListeners(triggerSelector, closeSelector);

    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
