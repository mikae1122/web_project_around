//------------------------ IMPORTAÇÕES ------------------------//
import { FormValidator } from "./formValidator.js";
import { Card } from "./card.js";

//------------------------ SELETORES DE ELEMENTOS DO DOM ------------------------//
const popup = document.querySelector(".popup");
const buttonOpen = document.querySelector(".main__interacao-botao");
const buttonClose = document.querySelector(".popup__close-button");
const buttonCloseImg = document.querySelector(".popup__close-buttonimg");

const formPerfil = document.querySelector(".popup__form");
const formCartao = document.querySelector(".popup__form-cartao");

const inputNome = document.getElementById("nome");
const inputProfissao = document.getElementById("profissao");

const tituloPerfil = document.querySelector(".main__interacao-titulo");
const textoPerfil = document.querySelector(".main__interacao-texto");

const popupCartao = document.querySelector(".popup__cartao");
const buttonOpen1 = document.getElementById("botao");
const closeButton1 = document.querySelector(".popup__close-img");
const buttonCriar = document.querySelector(".popup__close-cartaobutton");

const mainGrid = document.querySelector(".main__grid");
const inputLink = document.getElementById("link");
const inputTitulo = document.getElementById("titulo");

//------------------------ CONFIGURAÇÃO E INICIALIZAÇÃO DO FORMVALIDATOR ------------------------//
const validatorConfigBase = {
  inputSelector:
    ".popup__input-nome, .popup__input-profissao, .popup__input-titulo, .popup__input-link",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "input-error",
  errorClass: "error-visible",
};

const validatorPerfil = new FormValidator(
  { ...validatorConfigBase, submitButtonSelector: ".popup__close-button" },
  formPerfil
);

const validatorCartao = new FormValidator(
  {
    ...validatorConfigBase,
    submitButtonSelector: ".popup__close-cartaobutton",
  },
  formCartao
);

validatorPerfil.enableValidation();
validatorCartao.enableValidation();

//------------------------ CRIAÇÃO DO POPUP DE IMAGEM ------------------------//
const popupImagem = document.createElement("div");
popupImagem.classList.add("popup-imagem");
popupImagem.innerHTML = `
  <div class="popup-imagem-conteudo">
    <button class="popup-imagem-close">
      <img src="./images/Close-Icon.png" class="popup__close-img" alt="imagem de fechar" />
    </button>
    <img class="popup__img" src="" alt="">
    <p class="popup-imagem-titulo"></p>
  </div>`;
document.body.appendChild(popupImagem);

const popupImagemClose = popupImagem.querySelector(".popup-imagem-close");
const popupImagemImg = popupImagem.querySelector(".popup__img");
const popupImagemTitulo = popupImagem.querySelector(".popup-imagem-titulo");

//------------------------ FUNÇÕES DE ABRIR E FECHAR POPUPS ------------------------//
function openPopup() {
  popup.classList.add("popup__relative");
  inputNome.value = tituloPerfil.textContent;
  inputProfissao.value = textoPerfil.textContent;
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

//------------------------ FECHAR POPUPS AO CLICAR FORA ------------------------//
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

//------------------------ BLOQUEAR PROPAGAÇÃO DE EVENTOS DE CLIQUE ------------------------//
popup.addEventListener("click", (event) => event.stopPropagation());
popupCartao.addEventListener("click", (event) => event.stopPropagation());
popupImagem
  .querySelector(".popup-imagem-conteudo")
  .addEventListener("click", (event) => event.stopPropagation());

//------------------------ FUNÇÃO PARA ADICIONAR IMAGEM ------------------------//
function adicionarImagem(link, titulo) {
  const card = new Card(titulo, link, ".container");
  const cardElement = card.getCardElement();
  mainGrid.appendChild(cardElement);

  inputLink.value = "";
  inputTitulo.value = "";
}

//------------------------ VETOR DAS IMAGENS INICIAIS ------------------------//
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

//------------------------ FUNÇÃO PARA CARREGAR IMAGENS INICIAIS ------------------------//
function carregarImagensIniciais() {
  initialCards.forEach((cardData) => {
    const card = new Card(cardData.name, cardData.link, ".container");
    const cardElement = card.getCardElement();
    mainGrid.appendChild(cardElement);
  });
}

//------------------------ FUNÇÃO PARA SALVAR O PERFIL ------------------------//
function salvarPopup(event) {
  event.preventDefault();
  const novoNome = inputNome.value.trim();
  const novaProfissao = inputProfissao.value.trim();

  tituloPerfil.textContent = novoNome;
  textoPerfil.textContent = novaProfissao;

  closePopup();
}

//------------------------ EVENTOS DO POPUP DE IMAGEM ------------------------//
popupImagemClose.addEventListener("click", () => {
  popupImagem.classList.remove("popup-imagem-ativa");
});

popupImagem.addEventListener("click", (event) => {
  if (event.target === popupImagem) {
    popupImagem.classList.remove("popup-imagem-ativa");
  }
});

//------------------------ FUNÇÃO PARA CRIAR NOVO CARTÃO ------------------------//
function criarCartao(event) {
  event.preventDefault();
  if (!formCartao.checkValidity()) return;

  adicionarImagem(inputLink.value, inputTitulo.value);
  closeCartao();
}

//------------------------ EVENTOS DE CLIQUE ------------------------//
buttonCriar.addEventListener("click", criarCartao);
if (buttonOpen) buttonOpen.addEventListener("click", openPopup);
if (buttonClose) buttonClose.addEventListener("click", closePopup);
if (buttonCloseImg) buttonCloseImg.addEventListener("click", closePopup);
if (formPerfil) formPerfil.addEventListener("submit", salvarPopup);
if (buttonOpen1) buttonOpen1.addEventListener("click", openCartao);
if (closeButton1) closeButton1.addEventListener("click", closeCartao);

//------------------------ EVENTO PARA CARREGAR IMAGENS AO INICIAR O SITE ------------------------//
window.addEventListener("load", carregarImagensIniciais);

//------------------------ FECHAR POPUPS COM A TECLA ESC ------------------------//
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePopup();
    closeCartao();
    popupImagem.classList.remove("popup-imagem-ativa");
  }
});
