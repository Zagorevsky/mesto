// Создайте класс FormValidator, который настраивает валидацию полей формы:

// принимает в конструктор объект настроек с селекторами и классами формы;
// принимает вторым параметром элемент той формы, которая валидируется;
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
// имеет один публичный метод enableValidation, который включает валидацию формы.
//  Для каждой проверяемой формы создайте экземпляр класса FormValidator.

export default class FormValidator {

  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    // устанавливаем слушатель по событию ввода символа в цикле на каждое поле
    this._inputList.forEach(_inputElement => {
      _inputElement.addEventListener('input', () => {
        // проверяем валидность поля
        this._checkInputValidity(_inputElement);
        // переключаем состояние кнопки отправить
        this._toggleButtonState();
      })
      this._toggleButtonState();
    })
  }

  resetValidation() {
    // определяем и устанавливаем статус кнопки
    this._toggleButtonState();
    // сбрасываем ошибки старой валидации
    this._inputList.forEach(_inputElement => {
    const _errorElement = this._formElement.querySelector(`#${_inputElement.id}-error`);
    this._hideErrorInput(_errorElement, _inputElement);
    })
  }

  // проверяем валидность текущего поля
  _checkInputValidity(_inputElement) {
    // находим место для показа ошибки по шаблону 
    const _errorElement = this._formElement.querySelector(`#${_inputElement.id}-error`);
    const _validInput = !_inputElement.validity.valid;
    if (_validInput) {
      // если не валидный  - показываем строку ошибки
      this._showErrorInput(_errorElement, _inputElement);
    } else {
      // если валидный убираем строку ошибки
      this._hideErrorInput(_errorElement, _inputElement);
    }
  }

  // меняем вид кнопки в зависимости от валидности всех полей текущей фыормы
  _toggleButtonState() {
    if (this._hasValidInputs(this._inputList)) {
      this._enableButtonSubmit()
    } else {
      this._disableButtonSubmit()
    }
  }

  // показываем строку ошибки
  _showErrorInput(_errorElement, _inputElement) {
    _inputElement.classList.add(this._inputErrorClass);
    _errorElement.textContent = _inputElement.validationMessage;
    _errorElement.classList.add(this._errorClass);
  }

  // убираем строку ошибки
  _hideErrorInput(_errorElement, _inputElement) {
    _inputElement.classList.remove(this._inputErrorClass);
    _errorElement.textContent = '';
    _errorElement.classList.remove(this._errorClass);
  }

  // показываем скрытую кнопку отправить
  _disableButtonSubmit() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  // показываем активную кнопку отправить
  _enableButtonSubmit() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  // проверяем валидность всех полей одновременно
  _hasValidInputs() {
    const _validInputs = this._inputList.every((_inputElement) => {
      return _inputElement.validity.valid
    })
    return _validInputs
  }

}
