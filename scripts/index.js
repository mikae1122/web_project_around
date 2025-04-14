//------------------------ IMPORTAÇÕES ------------------------//
import { FormValidator } from "../component/formValidator.js";
import { Card } from "../component/card.js";
import { Section } from "../component/Section.js";

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
const closeButton1 = document.querySelector(".popup__close-cartaobuttonimg");
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

//------------------------ CRIAÇÃO DO OVERLAY ------------------------//
const overlay = document.createElement("div");
overlay.classList.add("overlay");
document.body.appendChild(overlay);

function showOverlay() {
  overlay.classList.add("ativo");
}

function hideOverlay() {
  overlay.classList.remove("ativo");
}

//------------------------ CRIAÇÃO DO POPUP DE IMAGEM ------------------------//

const popupImagem = document.querySelector(".popup-imagem");
const popupImagemClose = popupImagem.querySelector(".popup-imagem-close");
const popupImagemImg = popupImagem.querySelector(".popup-img");
const popupImagemTitulo = popupImagem.querySelector(".popup-imagem-titulo");

//------------------------ FUNÇÕES DE ABRIR E FECHAR POPUPS ------------------------//
function openPopup() {
  popup.classList.add("popup__relative");
  inputNome.value = tituloPerfil.textContent;
  inputProfissao.value = textoPerfil.textContent;
  showOverlay();
}

function closePopup() {
  popup.classList.remove("popup__relative");
  hideOverlay();
}

function openCartao() {
  popupCartao.classList.add("popup__relative-cartao");
  showOverlay();
}

function closeCartao() {
  popupCartao.classList.remove("popup__relative-cartao");
  hideOverlay();
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
});

//------------------------ BLOQUEAR PROPAGAÇÃO DE EVENTOS DE CLIQUE ------------------------//
popup.addEventListener("click", (event) => event.stopPropagation());
popupCartao.addEventListener("click", (event) => event.stopPropagation());
popupImagem
  .querySelector(".popup-imagem-conteudo")
  .addEventListener("click", (event) => event.stopPropagation());

//------------------------ FUNÇÃO PARA ABRIR A IMAGEM ------------------------/
function handleCardClick(name, link) {
  popupImagemImg.src = link;
  popupImagemImg.alt = name;
  popupImagemTitulo.textContent = name;
  popupImagem.classList.add("popup-imagem-ativa");
  showOverlay();
}

//------------------------ FUNÇÃO PARA ADICIONAR IMAGEM ------------------------//
function adicionarImagem(link, titulo) {
  const card = new Card(titulo, link, ".container", handleCardClick);
  const cardElement = card.getCardElement();
  section.addItem(cardElement);

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
const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(
        cardData.name,
        cardData.link,
        ".container",
        handleCardClick
      );
      const cardElement = card.getCardElement();
      section.addItem(cardElement);
    },
  },
  ".main__grid"
);

section.renderItems();

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
  hideOverlay();
});

popupImagem.addEventListener("click", (event) => {
  if (event.target === popupImagem) {
    popupImagem.classList.remove("popup-imagem-ativa");
    hideOverlay();
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

//------------------------ FECHAR POPUPS COM A TECLA ESC ------------------------//
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePopup();
    closeCartao();
    popupImagem.classList.remove("popup-imagem-ativa");
    hideOverlay();
  }
});
