// Создайте класс FormValidator, который настраивает валидацию полей формы:

// принимает в конструктор объект настроек с селекторами и классами формы;
// принимает вторым параметром элемент той формы, которая валидируется;
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
// имеет один публичный метод enableValidation, который включает валидацию формы.
//  Для каждой проверяемой формы создайте экземпляр класса FormValidator.


export class FormValidator {

  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement
  }

  // включение валидации каждого поля текущей формы

  enableValidation() {
    // получаем список полей текущей формы
    const _inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    // устанавливаем слушатель по событию ввода символа в цикле на каждое поле
    _inputList.forEach(_inputElement => {
      _inputElement.addEventListener('input', () => {
        // проверяем валидность поля
        this._checkInputValidity(_inputElement);
        // переключаем состояние кнопки отправить
        this._toggleButtonState(_inputList);
      })
      this._toggleButtonState(_inputList);
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
  _toggleButtonState(_inputList) {
    const _buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    if (this._hasValidInputs(_inputList)) {
      this._enableButtonSubmit(_buttonElement)
    } else {
      this._disableButtonSubmit(_buttonElement)
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

  // показываем активную кнопку отправить
  _disableButtonSubmit(_buttonElement) {
    _buttonElement.classList.add(this._inactiveButtonClass);
    _buttonElement.disabled = true;
  }

  // показываем скрытую кнопку отправить
  _enableButtonSubmit(_buttonElement) {
    _buttonElement.classList.remove(this._inactiveButtonClass);
    _buttonElement.disabled = false;
  }

  // проверяем валидность всех полей одновременно
  _hasValidInputs(_inputList) {
    const _validInputs = _inputList.every((_inputElement) => {
      return _inputElement.validity.valid
    })
    return _validInputs
  }

}
