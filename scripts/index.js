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

function adicionarImagem() {
  const linkValor = inputLink.value.trim();
  const tituloValor = inputTitulo.value.trim();

  if (linkValor === "" || tituloValor === "") {
    alert("Por favor, preencha ambos os campos!");
    return;
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

buttonOpen.addEventListener("click", openPopup);
buttonClose.addEventListener("click", closePopup);
buttonCloseImg.addEventListener("click", closePopup);
buttonOpen1.addEventListener("click", openCartao);
closeButton1.addEventListener("click", closeCartao);
buttonCriar.addEventListener("click", adicionarImagem);
