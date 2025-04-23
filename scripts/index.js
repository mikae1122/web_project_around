//------------------------ IMPORTAÇÕES ------------------------//
import { FormValidator } from "../component/formValidator.js";
import { Card } from "../component/card.js";
import { Section } from "../component/Section.js";
import { PopupWithForm } from "../component/PopupWithForm.js";
import { PopupWithImage } from "../component/PopupWithImage.js";
import { UserInfo } from "../component/UserInfo.js";
import { renderUserInfo } from "../component/UserInfo.js";
import { getUserInfo, updateUserInfo, getInitialCards } from "../component/api.js";

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
  .then(user => {
    console.log("Dados do usuário:", user); // Verificando os dados do usuário
    renderUserInfo(user);
  })
  .catch(err => console.log("Erro ao carregar dados do usuário:", err));

//------------------------ POPUP DE EDITAR PERFIL ------------------------//
const perfilPopup = new PopupWithForm(
  ".popup",
  "popup__relative",
  ({ nome, profissao }) => {
    updateUserInfo({ name: nome, about: profissao })
      .then(user => {
        console.log("Perfil atualizado:", user); // Verificando se o perfil foi atualizado corretamente
        renderUserInfo(user);
        perfilPopup.close(); // Fecha o popup após sucesso
      })
      .catch(err => console.log("Erro ao atualizar perfil:", err));
  }
);
perfilPopup.setEventListeners(
  ".main__interacao-botao",
  ".popup__close-buttonimg"
);

// Pré-preenche os campos do formulário com os dados atuais
document.querySelector(".main__interacao-botao").addEventListener("click", () => {
  const { nome, profissao } = userInfo.getUserInfo();
  inputNome.value = nome;
  inputProfissao.value = profissao;
});

//------------------------ POPUP DE ADICIONAR LOCAL ------------------------//
const cartaoPopup = new PopupWithForm(
  ".popup__cartao",
  "popup__relative-cartao",
  ({ link, titulo }) => {
    if (link && titulo) {
      adicionarImagem(link, titulo);
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
        cardData._id 
      );
      const cardElement = card.getCardElement();
      section.addItem(cardElement);
    },
  },
  ".main__grid"
);


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

// Essa função envia cada card para a API
function popularCardsIniciais() {
  initialCards.forEach(card => {
    fetch("https://around-api.pt-br.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "582fc07f-fe23-477a-994d-8aefd966d480",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    })
      .then(res => res.json())
      .then(data => console.log("Card adicionado:", data))
      .catch(err => console.error("Erro ao adicionar card:", err));
  });
}


getInitialCards()
  .then(cards => {
    console.log("Cards iniciais da API:", cards);
    if (Array.isArray(cards) && cards.length > 0) {
      section.renderItems(cards); // Renderizando os cards
    } else {
      console.log("Nenhum card encontrado ou resposta inválida:", cards);
    }
  })
  .catch(err => console.log("Erro ao carregar os cards iniciais:", err));

//------------------------ FUNÇÃO PARA ADICIONAR IMAGEM ------------------------//

function adicionarImagem(link, titulo) {
  console.log("Adicionando imagem:", titulo, link); // Verificando os dados de imagem sendo enviados
  
  // Enviar a requisição para salvar o card na API
  fetch("https://around-api.pt-br.tripleten-services.com/v1/cards", {
    method: "POST",
    headers: {
      authorization: "582fc07f-fe23-477a-994d-8aefd966d480",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: titulo,
      link: link,
    }),
  })
    .then(res => res.json())
    .then(data => {
      console.log("Card adicionado:", data);
      
      // Criar o card com o ID retornado pela API
      const card = new Card(data.name, data.link, ".container", handleCardClick, data._id);
      const cardElement = card.getCardElement();

      // Adicionar o card à seção
      section.addItem(cardElement);
      
      // Limpar os campos do formulário
      inputLink.value = "";
      inputTitulo.value = "";
    })
    .catch(err => {
      console.error("Erro ao adicionar card:", err);
    });
}
    
getInitialCards().then(cards => {
  if (cards.length === 0) {
    popularCardsIniciais();
  }
});