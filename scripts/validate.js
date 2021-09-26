// Создайте класс FormValidator, который настраивает валидацию полей формы:

// принимает в конструктор объект настроек с селекторами и классами формы;
// принимает вторым параметром элемент той формы, которая валидируется;
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
// имеет один публичный метод enableValidation, который включает валидацию формы.
//  Для каждой проверяемой формы создайте экземпляр класса FormValidator.

//  Требования к коду
// Эта самостоятельная работа отличается от предыдущих. До сих пор от вас требовалось реализовать какую-то функциональность. Вы думали, как заставить кнопки работать или сделать так, чтобы попап появлялся и исчезал. Сейчас весь функционал уже готов. Ваша задача — начать работу по организации кода.

// Первое требование — добавить классы Card и FormValidator в код. Каждый из них выполняет строго одну задачу. Всё, что относится к решению этой задачи, находится внутри класса.

// Второе требование — разбить JavaScript на модули. В проекте должно быть три js-файла:

// Card.js с кодом класса Card,
// FormValidator.js с кодом класса FormValidator,
// index.js со всем остальным кодом.
// Классы Card и FormValidator экспортируются из соответствующих файлов, импортируются в index.js и используются в нём.

// Отдельные js-файлы подключены в index.html как модули.

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
  buttonElement.disabled = true;
} 

// показываем скрытую кнопку отправить
const enableButtonSubmit = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
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
