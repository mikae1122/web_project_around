const popup = document.querySelector(".popup");
const buttonOpen = document.querySelector(".main__interacao-botao");
const buttonClose = document.querySelector(".popup__close-button ");
const butttonClose = document.querySelector(".popup__close-buttonimg");
const inputNome = document.querySelector(".popup__input-nome");
const inputProfissao = document.querySelector(".popup__input-profissao");

function Openbutton() {
  popup.classList.add("popup__relative");
  inputNome.value = "Jacques Cousteau";
  inputProfissao.value = "Explorador";
}
function Closebutton() {
  popup.classList.remove("popup__relative");
}

buttonOpen.addEventListener("click", Openbutton);
buttonClose.addEventListener("click", Closebutton);
butttonClose.addEventListener("click", Closebutton);
