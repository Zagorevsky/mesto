// включение валидации всех форм на странице
const enableValidation = (config)=> {
  // получаем список форм на странице
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  // сбрасываем стандартную отправку и устанавливаем слушатели на каждую форму из списка 
  formList.forEach(formElement => { 
    formElement.addEventListener('submit',(evt) =>{
      evt.preventDefault();
    })
    setEventListenerInput(formElement, config.inputSelector, config.inputErrorClass, config.errorClass, config.submitButtonSelector, config.inactiveButtonClass);
  });
}
// включение валидации каждого поля текущей формы
const setEventListenerInput = (formElement,inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass)=> {
  // получаем список полей текущей формы
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // устанавливаем слушатель по событию ввода символа в цикле на каждое поле
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', ()=> {
      // проверяем валидность поля
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      // переключаем состояние кнопки отправить
      toggleButtonState (formElement, inputList, submitButtonSelector, inactiveButtonClass);
    })
  })
}
// проверяем валидность текущего поля
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  // находим место для показа ошибки по шаблону 
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  const validInput = !inputElement.validity.valid;
  if (validInput) {
    // если не валидный  - показываем строку ошибки
    showErrorInput(errorElement, inputElement, inputErrorClass, errorClass);
  } else {
    // если валидный убираем строку ошибки
    hideErrorInput(errorElement, inputElement, inputErrorClass, errorClass);
  }
}

// показываем строку ошибки
const showErrorInput = (errorElement, inputElement, inputErrorClass, errorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

// убираем строку ошибки
const hideErrorInput = (errorElement, inputElement, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
} 

// показываем активную кнопку отправить
const disableButtonSubmit = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
} 

// показываем скрытую кнопку отправить
const enableButtonSubmit = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
} 

// меняем вид кнопки в зависимости от валидности всех полей текущей фыормы
const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) =>{
  const buttonElement = formElement.querySelector(submitButtonSelector);
  if (hasValidInputs(inputList)) {
    enableButtonSubmit(buttonElement, inactiveButtonClass)
  } else {
    disableButtonSubmit(buttonElement, inactiveButtonClass) }
}

// проверяем валидность всех полей одновременно
const hasValidInputs = (inputList) => {
  const validInputs = inputList.every((inputElement)=>{
    return inputElement.validity.valid
  })
  return validInputs
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
