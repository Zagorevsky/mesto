let profileEdit = document.querySelector('.profile__edit');
let popupClose = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let fullNameProfile = document.querySelector('.profile__full-name');
let descriptionProfile = document.querySelector('.profile__description');
let fullNameInput = document.querySelector('.popup__full-name');
let descriptionInput = document.querySelector('.popup__description');
let form = document.querySelector('.popup__form');

// Обработчик включения и выключения окна попап: кнопка редактировать профиль и закрыть попап
function togglePopup() {
  form.reset();
  fullNameInput.setAttribute('value', fullNameProfile.textContent);
  descriptionInput.setAttribute('value', descriptionProfile.textContent);
  popup.classList.toggle('popup_opened');
}

// Обработчик кнопки Сохранить окна попап
function formSubmit(event) {
  event.preventDefault();
  fullNameProfile.textContent = fullNameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  togglePopup();
}

// Слушаем кнопку Редактировать профиль
profileEdit.addEventListener('click',togglePopup);

// Слушае кнопку Закрыть попап
popupClose.addEventListener('click',togglePopup);

// Слушаем кнопку Сохранить попап
form.addEventListener('submit',formSubmit);