export class Card {
  _title;
  _imageLink;
  _templateSelector;

  constructor(title, imageLink, templateSelector) {
    this._title = title;
    this._imageLink = imageLink;
    this._templateSelector = templateSelector;
  }

  // Método público para retornar o elemento do card pronto
  getCardElement() {
    const cardElement = this._createCardElement();
    this._addEventListeners(cardElement);
    return cardElement;
  }

  // Método privado: Cria a estrutura HTML do card
  _createCardElement() {
    const container = document.createElement("div");
    container.classList.add("container");

    const imagemContainer = document.createElement("div");
    imagemContainer.classList.add("imagem-container-like");

    const botoesContainer = document.createElement("div");
    botoesContainer.classList.add("imagem-container-img");

    const imagem = document.createElement("img");
    imagem.src = this._imageLink;
    imagem.alt = this._title;
    imagem.classList.add("main__grid-img");

    const descricao = document.createElement("p");
    descricao.textContent = this._title;
    descricao.classList.add("main__grid-titulo");

    const botaoDelete = document.createElement("button");
    botaoDelete.innerHTML =
      '<img src="./images/Trash@2x.png" alt="Delete" class="main__delete-img">';
    botaoDelete.classList.add("btn-delete");

    const botaoLike = document.createElement("button");
    botaoLike.innerHTML = '<img src="./images/Vector (1).svg" alt="Curtir">';
    botaoLike.classList.add("btn-like");

    botoesContainer.appendChild(botaoDelete);
    botoesContainer.appendChild(imagem);

    imagemContainer.appendChild(botaoLike);
    imagemContainer.appendChild(descricao);

    container.appendChild(imagemContainer);
    container.appendChild(botoesContainer);

    // Armazena elementos para eventos
    container._image = imagem;
    container._deleteBtn = botaoDelete;
    container._likeBtn = botaoLike;

    return container;
  }

  // Método privado: Adiciona os ouvintes de eventos
  _addEventListeners(cardElement) {
    const imagem = cardElement._image;
    const botaoDelete = cardElement._deleteBtn;
    const botaoLike = cardElement._likeBtn;

    let curtido = false;

    imagem.addEventListener("click", () => {
      this._handleImageClick();
    });

    botaoDelete.addEventListener("click", () => {
      this._handleDelete(cardElement);
    });

    botaoLike.addEventListener("click", () => {
      curtido = this._handleLike(botaoLike, curtido);
    });
  }

  // Manipulador privado: abrir popup de imagem
  _handleImageClick() {
    popupImagem.classList.add("popup-imagem-ativa");
    popupImagemImg.src = this._imageLink;
    popupImagemImg.alt = this._title;
    popupImagemTitulo.textContent = this._title;
  }

  // Manipulador privado: remover card
  _handleDelete(cardElement) {
    cardElement.remove();
  }

  // Manipulador privado: curtir/descurtir
  _handleLike(botaoLike, curtido) {
    botaoLike.innerHTML = curtido
      ? '<img src="./images/Vector (1).svg" alt="Curtir">'
      : '<img src="./images/Union.png" alt="Curtido">';
    return !curtido;
  }
}
