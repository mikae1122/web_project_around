
const nomeElement = document.querySelector('.main__interacao-titulo');
const profissaoElement = document.querySelector('.main__interacao-texto');
const avatarElement = document.querySelector('.main__interacao-img');

export function renderUserInfo({ name, about, avatar }) {
  nomeElement.textContent = name;
  profissaoElement.textContent = about;
  avatarElement.src = avatar;
}


export class UserInfo {
  constructor({ nomeSelector, profissaoSelector }) {
    // Armazena os seletores dos elementos
    this._nomeElement = document.querySelector(nomeSelector);
    this._profissaoElement = document.querySelector(profissaoSelector);
  }



  // Método para pegar as informações do usuário
  getUserInfo() {
    return {
      nome: this._nomeElement.textContent,
      profissao: this._profissaoElement.textContent,
    };
  }

  // Método para atualizar as informações do usuário na página
  setUserInfo({ nome, profissao }) {
    this._nomeElement.textContent = nome;
    this._profissaoElement.textContent = profissao;
  }
}
