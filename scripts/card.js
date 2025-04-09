//------------------------ Classe Card ------------------------//
export class Card {
  _title;
  _imageLink;
  _templateSelector;
  _handleImageClick;

  constructor(title, imageLink, templateSelector, handleImageClick) {
    this._title = title;
    this._imageLink = imageLink;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  // Método público que retorna o card pronto com eventos
  getCardElement() {
    const cardElement = this._createCardElement();
    this._addEventListeners(cardElement);
    return cardElement;
  }

  //------------------------ Criação do elemento Card ------------------------//
  _createCardElement() {
    // Criação da estrutura principal do card
    const container = document.createElement("div");
    container.classList.add("container");

    const imagemContainer = document.createElement("div");
    imagemContainer.classList.add("imagem-container-like");

    const botoesContainer = document.createElement("div");
    botoesContainer.classList.add("imagem-container-img");

    // Imagem do card
    const imagem = document.createElement("img");
    imagem.src = this._imageLink;
    imagem.alt = this._title;
    imagem.classList.add("main__grid-img");

    // Título (descrição) da imagem
    const descricao = document.createElement("p");
    descricao.textContent = this._title;
    descricao.classList.add("main__grid-titulo");

    // Botão de deletar card
    const botaoDelete = document.createElement("button");
    botaoDelete.innerHTML =
      '<img src="./images/Trash@2x.png" alt="Delete" class="main__delete-img">';
    botaoDelete.classList.add("btn-delete");

    // Botão de curtir (like)
    const botaoLike = document.createElement("button");
    botaoLike.innerHTML = '<img src="./images/Vector (1).svg" alt="Curtir">';
    botaoLike.classList.add("btn-like");

    // Montagem da estrutura de botões e imagem
    botoesContainer.appendChild(botaoDelete);
    botoesContainer.appendChild(imagem);

    imagemContainer.appendChild(botaoLike);
    imagemContainer.appendChild(descricao);

    container.appendChild(imagemContainer);
    container.appendChild(botoesContainer);

    // Armazenando elementos no container para acesso posterior
    container._image = imagem;
    container._deleteBtn = botaoDelete;
    container._likeBtn = botaoLike;

    return container;
  }

  //------------------------ Eventos do Card ------------------------//
  _addEventListeners(cardElement) {
    const imagem = cardElement._image;
    const botaoDelete = cardElement._deleteBtn;
    const botaoLike = cardElement._likeBtn;

    let curtido = false;

    // Clique na imagem abre o popup
    imagem.addEventListener("click", () => {
      if (this._handleImageClick) {
        this._handleImageClick(this._title, this._imageLink);
      }
    });

    // Clique no botão de deletar remove o card
    botaoDelete.addEventListener("click", () => {
      this._handleDelete(cardElement);
    });

    // Clique no botão de curtir alterna o estado
    botaoLike.addEventListener("click", () => {
      curtido = this._handleLike(botaoLike, curtido);
    });
  }

  //------------------------ Ações dos botões ------------------------//
  _handleDelete(cardElement) {
    cardElement.remove();
  }

  _handleLike(botaoLike, curtido) {
    botaoLike.innerHTML = curtido
      ? '<img src="./images/Vector (1).svg" alt="Curtir">'
      : '<img src="./images/Union.png" alt="Curtido">';
    return !curtido;
  }
}
