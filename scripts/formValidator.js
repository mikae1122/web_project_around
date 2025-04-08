//------------------------ Classe FormValidator ------------------------//
export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  //------------------------ Inicialização da Validação ------------------------//
  enableValidation() {
    // Armazena os inputs e botão do formulário
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._setEventListeners(); // Define os ouvintes de eventos
  }

  //------------------------ Listeners de Input ------------------------//
  _setEventListeners() {
    this._toggleButtonState(); // Estado inicial do botão

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input); // Valida o input atual
        this._toggleButtonState(); // Atualiza o botão
      });
    });
  }

  //------------------------ Validação dos Campos ------------------------//
  _checkInputValidity(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    const valor = input.value.trim();

    if (!errorElement) return;

    if (valor.length === 0) {
      // Campo vazio
      this._showError(input, errorElement, "Preencha esse campo.");
    } else if (
      input.type !== "url" &&
      (valor.length < 2 || valor.length > 40)
    ) {
      // Campo texto fora do tamanho permitido
      this._showError(
        input,
        errorElement,
        "O campo deve ter entre 2 e 40 caracteres."
      );
    } else if (
      input.type === "url" &&
      (!this._isValidUrl(valor) || !valor.startsWith("https://"))
    ) {
      // Campo URL inválido
      this._showError(input, errorElement, "Insira um link HTTPS válido.");
    } else {
      // Campo válido
      this._hideError(input, errorElement);
    }
  }

  //------------------------ Validação de URL ------------------------//
  _isValidUrl(valor) {
    try {
      new URL(valor); // Verifica se é uma URL válida
      return true;
    } catch {
      return false;
    }
  }

  //------------------------ Exibir Erro ------------------------//
  _showError(input, errorElement, message) {
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = message;
    errorElement.classList.add(this._errorClass);
  }

  //------------------------ Ocultar Erro ------------------------//
  _hideError(input, errorElement) {
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  //------------------------ Verifica se há inputs inválidos ------------------------//
  _hasInvalidInput() {
    return this._inputList.some(
      (input) =>
        !input.validity.valid || input.classList.contains(this._inputErrorClass)
    );
  }

  //------------------------ Ativa/Desativa o botão de submit ------------------------//
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
}
