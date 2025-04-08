import { FormValidator } from "./formValidator.js";
import { Card } from "./card.js";
//---------------- criação das constantes --------------//
const popup = document.querySelector(".popup");
const buttonOpen = document.querySelector(".main__interacao-botao");
const buttonClose = document.querySelector(".popup__close-button");
const buttonCloseImg = document.querySelector(".popup__close-buttonimg");

const validationConfig = {
  inputSelector: ".popup__input",

  submitButtonSelector: ".popup__close-button, .popup__close-cartaobutton", // os dois botões de submit
  inactiveButtonClass: "form__submit_disabled", // você pode estilizar isso no CSS
  inputErrorClass: "input-error", // classe que adiciona borda vermelha no input
  errorClass: "error-visible", // classe que exibe a mensagem de erro
};

const formPerfil = document.querySelector(".popup__form");
const formCartao = document.querySelector(".popup__form-cartao");

const validatorPerfil = new FormValidator(
  {
    inputSelector:
      ".popup__input-nome, .popup__input-profissao, .popup__input-titulo, .popup__input-link",
    submitButtonSelector: ".popup__close-button",
    inactiveButtonClass: "form__submit_disabled",
    inputErrorClass: "input-error",
    errorClass: "error-visible",
  },
  formPerfil
);

const validatorCartao = new FormValidator(
  {
    inputSelector:
      ".popup__input-nome, .popup__input-profissao, .popup__input-titulo, .popup__input-link",
    submitButtonSelector: ".popup__close-cartaobutton",
    inactiveButtonClass: "form__submit_disabled",
    inputErrorClass: "input-error",
    errorClass: "error-visible",
  },
  formCartao
);

validatorPerfil.enableValidation();
validatorCartao.enableValidation();

const inputNome = document.getElementById("nome");
const inputProfissao = document.getElementById("profissao");

const nomeError = document.getElementById("nome-error");
const profissaoError = document.getElementById("profissao-error");
const linkError = document.getElementById("linkSpan");
const tituloError = document.getElementById("tituloSpan");
const tituloPerfil = document.querySelector(".main__interacao-titulo");
const textoPerfil = document.querySelector(".main__interacao-texto");
const buttonSalvar = document.querySelector(".popup__close-button");

const popupCartao = document.querySelector(".popup__cartao");
const buttonOpen1 = document.getElementById("botao");
const closeButton1 = document.querySelector(".popup__close-img");
const buttonCriar = document.querySelector(".popup__close-cartaobutton");

const mainGrid = document.querySelector(".main__grid");
const inputLink = document.getElementById("link");
const inputTitulo = document.getElementById("titulo");

const popupImagem = document.createElement("div");
popupImagem.classList.add("popup-imagem");
popupImagem.innerHTML = `<div class="popup-imagem-conteudo">
    <button class="popup-imagem-close"><img
              src="./images/Close-Icon.png"
              class="popup__close-img"
              alt="imagem de fechar"
            /></button>
    <img class="popup__img" src="" alt="">
    <p class="popup-imagem-titulo"></p>
  </div>`;
document.body.appendChild(popupImagem);

const popupImagemClose = popupImagem.querySelector(".popup-imagem-close");
const popupImagemImg = popupImagem.querySelector(".popup__img");
const popupImagemTitulo = popupImagem.querySelector(".popup-imagem-titulo");
//--------------- validação dos formularios -----------------//

//---------------- função para abrir o popup ---------------//
function openPopup() {
  popup.classList.add("popup__relative");
  inputNome.value = tituloPerfil.textContent;
  inputProfissao.value = textoPerfil.textContent;
}
//---------------- função para fechar o popup ---------------//
function closePopup() {
  popup.classList.remove("popup__relative");
}

//----------------- função de abrir popup__cartão-------------------//
function openCartao() {
  popupCartao.classList.add("popup__relative-cartao");
}
//---------------- função de fechar popup__cartão----------------//
function closeCartao() {
  popupCartao.classList.remove("popup__relative-cartao");
}
//----------------- evanto de ouvidoria para fechar janelas clicando fora delas-------------//
document.addEventListener("click", function (event) {
  if (
    popup.classList.contains("popup__relative") &&
    !popup.contains(event.target) &&
    !buttonOpen.contains(event.target)
  ) {
    closePopup();
  }

  if (
    popupCartao.classList.contains("popup__relative-cartao") &&
    !popupCartao.contains(event.target) &&
    !buttonOpen1.contains(event.target)
  ) {
    closeCartao();
  }

  if (
    popupImagem.classList.contains("popup-imagem-ativa") &&
    !popupImagem.querySelector(".popup-imagem-conteudo").contains(event.target)
  ) {
    popupImagem.classList.remove("popup-imagem-ativa");
  }
});

popup.addEventListener("click", function (event) {
  event.stopPropagation();
});

popupCartao.addEventListener("click", function (event) {
  event.stopPropagation();
});

popupImagem
  .querySelector(".popup-imagem-conteudo")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });
//---------------- função para adcionar imagem ----------------//
function adicionarImagem(link, titulo) {
  const card = new Card(titulo, link, ".container");
  const cardElement = card.getCardElement();
  mainGrid.appendChild(cardElement);

  inputLink.value = "";
  inputTitulo.value = "";
}

//----------------- função para carreagar as imagens iniciais ---------------//
function carregarImagensIniciais() {
  initialCards.forEach((cardData) => {
    const card = new Card(cardData.name, cardData.link, ".container");
    const cardElement = card.getCardElement();
    mainGrid.appendChild(cardElement);
  });
}

//---------------- vetor das imagens inicias ------------//
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
function salvarPopup(event) {
  event.preventDefault();

  const novoNome = inputNome.value.trim();
  const novaProfissao = inputProfissao.value.trim();

  tituloPerfil.textContent = novoNome;
  textoPerfil.textContent = novaProfissao;

  closePopup();
}

//-------------- para abrir as imagens -------------//
popupImagemClose.addEventListener("click", function () {
  popupImagem.classList.remove("popup-imagem-ativa");
});

//-------------- para fechalas clicando fora delas  ----------//
popupImagem.addEventListener("click", function (event) {
  if (event.target === popupImagem) {
    popupImagem.classList.remove("popup-imagem-ativa");
  }
});
function criarCartao(event) {
  event.preventDefault();
  if (!formCartao.checkValidity()) return;

  adicionarImagem(inputLink.value, inputTitulo.value);
  closeCartao();
}
buttonCriar.addEventListener("click", criarCartao);

if (buttonOpen) buttonOpen.addEventListener("click", openPopup);
if (buttonClose) buttonClose.addEventListener("click", closePopup);
if (buttonCloseImg) buttonCloseImg.addEventListener("click", closePopup);
if (formPerfil) formPerfil.addEventListener("submit", salvarPopup);
if (buttonOpen1) buttonOpen1.addEventListener("click", openCartao);
if (closeButton1) closeButton1.addEventListener("click", closeCartao);
//----------------- carregar funções no inicio do cite ----------------//
window.addEventListener("load", function () {
  carregarImagensIniciais();
});
//--------------- fechar janelas popup usando a tecla esc ---------------//
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePopup();
    closeCartao();
    popupImagem.classList.remove("popup-imagem-ativa");
  }
});
