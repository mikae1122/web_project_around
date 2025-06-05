//------------------------ IMPORTAÇÕES ------------------------//
import { FormValidator } from "../component/formValidator.js";
import { Card } from "../component/card.js";
import { Section } from "../component/Section.js";
import { PopupWithForm } from "../component/PopupWithForm.js";
import { PopupWithImage } from "../component/PopupWithImage.js";
import { UserInfo } from "../component/UserInfo.js";
import { renderUserInfo } from "../component/UserInfo.js";
import {
  getUserInfo,
  updateUserInfo,
  getInitialCards,
  addCard,
} from "../component/api.js";

import PopupWithConfirmation from "../component/PopupWithConfirmation.js";

const confirmPopup = new PopupWithConfirmation(".popup__confirm", "ativa");
confirmPopup.setEventListeners();

import { handledelete } from "../component/api.js";

//------------------------ SELETORES DE ELEMENTOS DO DOM ------------------------//
const formPerfil = document.querySelector(".popup__form");
const formCartao = document.querySelector(".popup__form-cartao");

const inputNome = document.getElementById("nome");
const inputProfissao = document.getElementById("profissao");

const inputLink = document.getElementById("link");
const inputTitulo = document.getElementById("titulo");

//------------------------ INSTÂNCIA DA CLASSE UserInfo ------------------------//
const userInfo = new UserInfo({
  nomeSelector: ".main__interacao-titulo",
  profissaoSelector: ".main__interacao-texto",
});

//------------------------ CARREGAR DADOS DO USUÁRIO DA API ------------------------//
getUserInfo()
  .then((user) => {
    console.log("Dados do usuário:", user);
    renderUserInfo(user);
  })
  .catch((err) => console.log("Erro ao carregar dados do usuário:", err));

//------------------------ POPUP DE EDITAR PERFIL ------------------------//
const perfilPopup = new PopupWithForm(
  ".popup",
  "popup__relative",
  ({ nome, profissao }) => {
    updateUserInfo({ name: nome, about: profissao })
      .then((user) => {
        console.log("Perfil atualizado:", user);
        renderUserInfo(user);
        perfilPopup.close();
      })
      .catch((err) => console.log("Erro ao atualizar perfil:", err));
  }
);
perfilPopup.setEventListeners(
  ".main__interacao-botao",
  ".popup__close-buttonimg"
);

document
  .querySelector(".main__interacao-botao")
  .addEventListener("click", () => {
    const { nome, profissao } = userInfo.getUserInfo();
    inputNome.value = nome;
    inputProfissao.value = profissao;
  });

//------------------------ POPUP DE ADICIONAR LOCAL ------------------------//

const cartaoPopup = new PopupWithForm(
  ".popup__cartao",
  "popup__relative-ativo",
  ({ link, titulo }) => {
    if (link && titulo) {
      addCard({ name: titulo, link: link })
        .then((data) => {
          const card = new Card(
            data.name,
            data.link,
            ".container",
            handleCardClick,
            data._id,
            () => {
              confirmPopup.open();
            }
          );
          const cardElement = card.getCardElement();
          section.addItem(cardElement);
          cartaoPopup.close();
        })
        .catch((err) => {
          console.error("Erro ao salvar card:", err.message);
        });
    }
  }
);
cartaoPopup.setEventListeners("#botao", ".popup__close-cartaobuttonimg");

//------------------------ POPUP DE IMAGEM ------------------------//
const popupWithImage = new PopupWithImage(
  ".popup__imagem",
  "popup__imagem-ativa"
);
popupWithImage.setEventListeners(null, ".popup__imagem-close");

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

//------------------------ RENDERIZAÇÃO DAS IMAGENS INICIAIS DA API ------------------------//
const section = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const card = new Card(
        cardData.name,
        cardData.link,
        ".container",
        handleCardClick,
        cardData._id,

        (cardDelete) => {
          console.log(cardDelete);
          confirmPopup.setSubmitAction(() => {
            handledelete({ cardid: cardData._id })
              .then(() => {
                cardDelete._handleDelete();
                confirmPopup.close();
              })
              .catch((err) => {
                console.error("Erro ao deletar o card:", err);
              });
          });

          confirmPopup.open();
        }
      );

      const cardElement = card.getCardElement();
      section.addItem(cardElement);
    },
  },
  ".main__grid"
);

// Essa função envia os cards iniciais para a API
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

function popularCardsIniciais() {
  initialCards.forEach((card) => {
    addCard({ name: card.name, link: card.link })
      .then((data) => console.log("Card adicionado:", data))
      .catch((err) => console.error("Erro ao adicionar card:", err));
  });
}

getInitialCards()
  .then((cards) => {
    console.log("Cards iniciais da API:", cards);
    if (Array.isArray(cards) && cards.length > 0) {
      section.renderItems(cards.reverse());
    } else {
      console.log("Nenhum card encontrado ou resposta inválida:", cards);
      popularCardsIniciais();
    }
  })
  .catch((err) => console.log("Erro ao carregar os cards iniciais:", err));
