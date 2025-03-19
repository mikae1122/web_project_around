const popup = document.querySelector(".popup");
const buttonOpen = document.querySelector(".main__interacao-botao");
const buttonClose = document.querySelector(".popup__close-button");
const buttonCloseImg = document.querySelector(".popup__close-buttonimg");
const inputNome = document.querySelector(".popup__input-nome");
const inputProfissao = document.querySelector(".popup__input-profissao");

const popupCartao = document.querySelector(".popup__cartao");
const buttonOpen1 = document.getElementById("botao");
const closeButton1 = document.querySelector(".popup__close-img");
const buttonCriar = document.querySelector(".popup__close-cartaobutton");

const mainGrid = document.querySelector(".main__grid");
const inputLink = document.getElementById("link");
const inputTitulo = document.getElementById("titulo");

const popupImagem = document.createElement("div");
popupImagem.classList.add("popup-imagem");
popupImagem.innerHTML = `
  <div class="popup-imagem-conteudo">
    <button class="popup-imagem-close"><img
              src="./images/Close-Icon.png"
              class="popup__close-img"
              alt="imagem de fechar"
            /></button>
    <img class="popup__img" src="" alt="">
    <p class="popup-imagem-titulo"></p>
  </div>
`;
document.body.appendChild(popupImagem);

const popupImagemClose = popupImagem.querySelector(".popup-imagem-close");
const popupImagemImg = popupImagem.querySelector(".popup__img");
const popupImagemTitulo = popupImagem.querySelector(".popup-imagem-titulo");

function openPopup() {
  popup.classList.add("popup__relative");
  inputNome.value = "Jacques Cousteau";
  inputProfissao.value = "Explorador";
}

function closePopup() {
  popup.classList.remove("popup__relative");
}

function openCartao() {
  popupCartao.classList.add("popup__relative-cartao");
}

function closeCartao() {
  popupCartao.classList.remove("popup__relative-cartao");
}

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function adicionarImagem(linkValor, tituloValor) {
  if (!linkValor || !tituloValor) {
    linkValor = inputLink.value.trim();
    tituloValor = inputTitulo.value.trim();

    if (linkValor === "" || tituloValor === "") {
      alert("Por favor, preencha ambos os campos!");
      return;
    }
  }

  const container = document.createElement("div");
  container.classList.add("container");

  const imagemContainer = document.createElement("div");
  imagemContainer.classList.add("imagem-container-like");

  const botoesContainer = document.createElement("div");
  botoesContainer.classList.add("imagem-container-img");

  const imagem = document.createElement("img");
  imagem.src = linkValor;
  imagem.alt = tituloValor;
  imagem.classList.add("main__grid-img");

  imagem.addEventListener("click", function () {
    popupImagem.classList.add("popup-imagem-ativa");
    popupImagemImg.src = linkValor;
    popupImagemImg.alt = tituloValor;
    popupImagemTitulo.textContent = tituloValor;
  });

  const descricao = document.createElement("p");
  descricao.textContent = tituloValor;
  descricao.classList.add("main__grid-titulo");

  const botaoDelete = document.createElement("button");
  botaoDelete.innerHTML =
    '<img src="./images/Trash@2x.png" alt="Delete" class="main__delete-img">';
  botaoDelete.classList.add("btn-delete");

  botaoDelete.addEventListener("click", function () {
    container.remove();
  });

  let curtido = false;
  const botaoLike = document.createElement("button");
  botaoLike.innerHTML =
    '<img src="./images/Vector (1).svg" alt="Curtir" class="">';
  botaoLike.classList.add("btn-like");

  botaoLike.addEventListener("click", function () {
    if (curtido) {
      botaoLike.innerHTML =
        '<img src="./images/Vector (1).svg" alt="Curtir" class="">';
    } else {
      botaoLike.innerHTML =
        '<img src="./images/Union.png" alt="Curtir" class="">';
    }
    curtido = !curtido;
  });

  botoesContainer.appendChild(botaoDelete);
  botoesContainer.appendChild(imagem);

  imagemContainer.appendChild(botaoLike);
  imagemContainer.appendChild(descricao);

  container.appendChild(imagemContainer);
  container.appendChild(botoesContainer);

  mainGrid.appendChild(container);

  inputLink.value = "";
  inputTitulo.value = "";
}

function carregarImagensIniciais() {
  initialCards.forEach((card) => {
    adicionarImagem(card.link, card.name);
  });
}
popupImagemClose.addEventListener("click", function () {
  popupImagem.classList.remove("popup-imagem-ativa");
});

popupImagem.addEventListener("click", function (event) {
  if (event.target === popupImagem) {
    popupImagem.classList.remove("popup-imagem-ativa");
  }
});

if (buttonOpen) buttonOpen.addEventListener("click", openPopup);
if (buttonClose) buttonClose.addEventListener("click", closePopup);
if (buttonCloseImg) buttonCloseImg.addEventListener("click", closePopup);
if (buttonOpen1) buttonOpen1.addEventListener("click", openCartao);
if (closeButton1) closeButton1.addEventListener("click", closeCartao);
if (buttonCriar)
  buttonCriar.addEventListener("click", function () {
    console.log("esta funcionando");
    adicionarImagem();
    closeCartao();
  });

window.addEventListener("load", carregarImagensIniciais);
