//------------------------ IMPORTAÇÕES ------------------------//
import { FormValidator } from "../component/formValidator.js";
import { Card } from "../component/card.js";
import { Section } from "../component/Section.js";
import { Popup } from "../component/popup.js";
import { PopupWithImage } from "../component/PopupWithImage.js";

//------------------------ SELETORES DE ELEMENTOS DO DOM ------------------------//
const formPerfil = document.querySelector(".popup__form");
const formCartao = document.querySelector(".popup__form-cartao");

const inputNome = document.getElementById("nome");
const inputProfissao = document.getElementById("profissao");

const tituloPerfil = document.querySelector(".main__interacao-titulo");
const textoPerfil = document.querySelector(".main__interacao-texto");

const inputLink = document.getElementById("link");
const inputTitulo = document.getElementById("titulo");

//------------------------ POPUP VIA CLASSE ------------------------//
const perfilPopup = new Popup(".popup", "popup__relative");
perfilPopup.setEventListeners(
  ".main__interacao-botao",
  ".popup__close-buttonimg"
);

document
  .querySelector(".main__interacao-botao")
  .addEventListener("click", () => {
    inputNome.value = "Jacques Cousteau";
    inputProfissao.value = "Explorador";
  });

const cartaoPopup = new Popup(".popup__cartao", "popup__relative-cartao");
cartaoPopup.setEventListeners("#botao", ".popup__close-cartaobuttonimg");

//------------------------ POPUP DE IMAGEM ------------------------//
const popupWithImage = new PopupWithImage(
  ".popup-imagem",
  "popup-imagem-ativa"
);

// Adiciona o event listener para o botão de fechar da imagem
popupWithImage.setEventListeners(null, ".popup-imagem-close");

// Função para abrir o popup de imagem
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

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

  perfilPopup.close();
}

if (formPerfil) formPerfil.addEventListener("submit", salvarPopup);

function salvarCartao(event) {
  event.preventDefault();
  const link = inputLink.value.trim();
  const titulo = inputTitulo.value.trim();

  if (link && titulo) {
    adicionarImagem(link, titulo);
    cartaoPopup.close();
  }
}

if (formCartao) formCartao.addEventListener("submit", salvarCartao);
