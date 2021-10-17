// база данных карточек
export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

// Получаем текущее содержание профиля
export const fullNameProfile = document.querySelector('.profile__full-name');
export const descriptionProfile = document.querySelector('.profile__description');

// Получаем кнопку редактировать профиль
export const profileEdit = document.querySelector('.profile__edit');
// Получаем кнопку добавить карту
export const buttonAddCard = document.querySelector('.profile__add-card');
// Получаем контейнер для размещения карточек с фото
export const cardsContainer = document.querySelector('.elements');
// Получаем попап для редактирования профиля
export const popupProfile = document.querySelector('.popup_profile');
// Получаем попап для добавления новой карты
export const popupCard = document.querySelector('.popup_card');
export const popupImg = document.querySelector('.popup_img');
export const cardSelector = '#element';

export const fullNameProfilePopup = popupProfile.querySelector('#full-name');
export const descriptionProfilePopup = popupProfile.querySelector('#description');

export const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
