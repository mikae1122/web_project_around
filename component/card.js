//------------------------ Classe Card ------------------------//
export class Card {
  _title;
  _imageLink;
  _templateSelector;
  _handleImageClick;
  _id; // ID do card (vindo da APIs)

  constructor(
    title,
    imageLink,
    templateSelector,
    handleImageClick,
    id,
    confirmPopup
  ) {
    this._title = title;
    this._imageLink = imageLink;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._id = id;
    this._confirmPopup = confirmPopup;
  }

  // Método público que retorna o card pronto com eventos
  getCardElement() {
    const cardElement = this._createCardElement();
    this._cardElement = cardElement;
    this._addEventListeners(cardElement);

    return cardElement;
  }

  //------------------------ Criação do elemento Card ------------------------//
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

    imagem.addEventListener("click", () => {
      if (this._handleImageClick) {
        this._handleImageClick(this._title, this._imageLink);
      }
    });

    botaoDelete.addEventListener("click", () => {
      //  this._confirmPopup.setSubmitAction(() => {
      //     this._handleDelete(cardElement); // executa só se confirmar
      //     this._confirmPopup.close(); // fecha o popup após excluir
      //   });
      this._confirmPopup(this);
    });

    botaoLike.addEventListener("click", () => {
      curtido = this._handleLike(botaoLike, curtido);
    });
  }

  //------------------------ Ações dos botões ------------------------//
  _handleDelete(cardDelete) {
    this._cardElement.remove();
  }

  _handleLike(botaoLike, curtido) {
    botaoLike.innerHTML = curtido
      ? '<img src="./images/Vector (1).svg" alt="Curtir">'
      : '<img src="./images/Union.png" alt="Curtido">';
    return !curtido;
  }

  //------------------------ Método para salvar o card na API ------------------------//
  saveCard() {
    const cardData = {
      name: this._title,
      link: this._imageLink,
    };

    fetch("https://around-api.pt-br.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "582fc07f-fe23-477a-994d-8aefd966d480", // seu token
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          this._id = data._id; // Armazena o ID gerado pelo servidor
          console.log("Card salvo com sucesso!", data);
        } else {
          console.error("Erro ao salvar card:", data);
        }
      })
      .catch((err) => {
        console.error("Erro ao salvar card:", err);
      });
  }
}
