import { Popup } from "./popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, activeClass) {
    super(popupSelector, activeClass);
    this._popupImage = this._popup.querySelector(".popup-img");
    this._popupCaption = this._popup.querySelector(".popup-imagem-titulo");
  }

  // Sobrescrevendo o método open da classe Popup
  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }
}
