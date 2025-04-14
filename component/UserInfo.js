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
