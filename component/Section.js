export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //------------------------ Renderiza todos os elementos ------------------------//
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  //------------------------ Adiciona um novo item ao container ------------------------//
  addItem(element) {
    this._container.prepend(element);
  }
}
