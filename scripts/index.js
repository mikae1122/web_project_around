const popup = document.querySelector(".popup");
const buttonOpen = document.querySelector(".main__interacao-botao");
const buttonClose = document.querySelector(".popup__close-button ");
const butttonClose = document.querySelector(".popup__close-buttonimg");

function Openbutton() {
  popup.classList.add("popup__relative");
}
function Closebutton() {
  console.log("1");
  popup.classList.remove("popup__relative");
}

buttonOpen.addEventListener("click", Openbutton);
buttonClose.addEventListener("click", Closebutton);
butttonClose.addEventListener("click", Closebutton);
