//------------------------ IMPORTAÇÕES ------------------------//
import { FormValidator } from "../component/formValidator.js";
import { Card } from "../component/card.js";
import { Section } from "../component/Section.js";
import { Popup } from "../component/popup.js";

//------------------------ SELETORES DE ELEMENTOS DO DOM ------------------------//
const formPerfil = document.querySelector(".popup__form");
const formCartao = document.querySelector(".popup__form-cartao");

const inputNome = document.getElementById("nome");
const inputProfissao = document.getElementById("profissao");

const tituloPerfil = document.querySelector(".main__interacao-titulo");
const textoPerfil = document.querySelector(".main__interacao-texto");

const inputLink = document.getElementById("link");
const inputTitulo = document.getElementById("titulo");

const popupImagem = document.querySelector(".popup-imagem");
const popupImagemClose = popupImagem.querySelector(".popup-imagem-close");
const popupImagemImg = popupImagem.querySelector(".popup-img");
const popupImagemTitulo = popupImagem.querySelector(".popup-imagem-titulo");

//------------------------ POPUP VIA CLASSE ------------------------//
// Instancie o popup de perfil e o de cartão com a classe correspondente
const perfilPopup = new Popup(".popup", "popup__relative");
perfilPopup.setEventListeners(
  ".main__interacao-botao",
  ".popup__close-buttonimg"
);

const cartaoPopup = new Popup(".popup__cartao", "popup__relative-cartao");
cartaoPopup.setEventListeners("#botao", ".popup__close-cartaobuttonimg");

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

//------------------------ POPUP DE IMAGEM ------------------------//
// Já que o popup de imagem tem comportamento um pouco diferente, mantenha a lógica
function handleCardClick(name, link) {
  popupImagemImg.src = link;
  popupImagemImg.alt = name;
  popupImagemTitulo.textContent = name;
  popupImagem.classList.add("popup-imagem-ativa");
}

popupImagemClose.addEventListener("click", () => {
  popupImagem.classList.remove("popup-imagem-ativa");
});
popupImagem.addEventListener("click", (event) => {
  if (event.target === popupImagem) {
    popupImagem.classList.remove("popup-imagem-ativa");
  }
});

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

  // Usa o método do popup para fechar
  perfilPopup.close();
}

if (formPerfil) formPerfil.addEventListener("submit", salvarPopup);
