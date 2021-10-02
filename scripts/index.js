// Первое требование — добавить классы Card и FormValidator в код. Каждый из них выполняет строго одну задачу. 
// Всё, что относится к решению этой задачи, находится внутри класса.
// Второе требование — разбить JavaScript на модули. В проекте должно быть три js-файла:

// Card.js с кодом класса Card,
// FormValidator.js с кодом класса FormValidator,
// index.js со всем остальным кодом.
// Классы Card и FormValidator экспортируются из соответствующих файлов, импортируются в index.js и используются в нём.
// Отдельные js-файлы подключены в index.html как модули.


import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// база данных карточек
const initialCards = [
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
const fullNameProfile = document.querySelector('.profile__full-name');
const descriptionProfile = document.querySelector('.profile__description');
// Получаем кнопку редактировать профиль
const profileEdit = document.querySelector('.profile__edit');
// Получаем кнопку добавить карту
const buttonAddCard = document.querySelector('.profile__add-card');
// Получаем контейнер для размещения карточек с фото
const cardsContainer = document.querySelector('.elements');
// Получаем попап для редактирования профиля
const popupProfile = document.querySelector('.popup_profile');
// Получаем попап для добавления новой карты
const popupCard = document.querySelector('.popup_card');
const popupImg = document.querySelector('.popup_img');
const imagePopup = popupImg.querySelector('.popup__image');
const titleImagePopup = popupImg.querySelector('.popup__title-img');
const cardSelector = '#element';

const fullNameProfilePopup = popupProfile.querySelector('#full-name');
const descriptionProfilePopup = popupProfile.querySelector('#description');

const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//  экземпляр валидации формы новой карты
const formValidatorCard = new FormValidator(config, popupCard);

// экземпляр валидации формы профиля
const formValidatorProfile = new FormValidator(config, popupProfile)


// Устанавливаем слушатели на закрытие всех попап
const setEventListenerPopupClose = () => {
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
    })
  })
}

const setEventListener = () => {
  // Слушатель кнопки - редактировать профиль
  profileEdit.addEventListener('click', openPopupProfil);
  // Слушатель кнопки - добавить карту
  buttonAddCard.addEventListener('click', openPopupCard);
  // Слушатель кнопки отправить форму Профиль
  popupProfile.querySelector('.popup__form').addEventListener('submit', sendFormProfil);
  // Слушатель кнопки отправить форму Новое место
  popupCard.querySelector('.popup__form').addEventListener('submit', sendFormNewCard);
}

// закрытие попап по клавише ESC
const closeByEscape = (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Открыть попап
const openPopup = (namePopup) => {
  document.addEventListener('keydown', closeByEscape);
  namePopup.classList.add('popup_opened');
}

// Закрыть попап
const closePopup = (namePopup) => {
  namePopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

// Октрыть попап для редактировать профиля
const openPopupProfil = () => {
  fullNameProfilePopup.value = fullNameProfile.textContent;
  descriptionProfilePopup.value = descriptionProfile.textContent;
  // Удаляем сообщения об ошибках
  formValidatorProfile.resetValidation();
  openPopup(popupProfile);
}

// Обработчик клика по фото карточки 
export const openImagePopup = (evt) => {
  // Наполняем попап данными из карточки 
  imagePopup.src = evt.target.src;
  imagePopup.alt = evt.target.alt;
  titleImagePopup.textContent = evt.target.alt;
  // Открываем попап 
  openPopup(popupImg);
}


// Обработчик отправки формы профиль 
const sendFormProfil = () => {
  // Наполняем данными попап
  fullNameProfile.textContent = fullNameProfilePopup.value;
  descriptionProfile.textContent = descriptionProfilePopup.value;
  // Закрываем попап
  closePopup(popupProfile);
}

// Открыть попап для создания карточки Новое место
const openPopupCard = () => {
  // Делаем сброс формы
  popupCard.querySelector('.popup__form').reset();
  // Удаляем сообщения об ошибках
  formValidatorCard.resetValidation();
  // Открываем попап
  openPopup(popupCard);
}

// Создатель карточки Новое место
const sendFormNewCard = () => {
  // Получае данные из формы
  const nameCard = popupCard.querySelector('[name="card-title"]').value;
  const linkCard = popupCard.querySelector('[name="card-link"]').value;
  // Создаем новый экземпляр класса Card
  const card = new Card(nameCard, linkCard, cardSelector);
  // Добавляем новую карточку в начало контейнера
  cardsContainer.prepend(card.addCard());
  // Закрываем попап
  closePopup(popupCard);
}

const addInitialCards = () => {
  // Начальный публикатор базы данных всех карт
  initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, cardSelector);
    const cardElement = card.addCard();
    // Добавляем в DOM
    cardsContainer.append(cardElement);
  });
}

// Создаем валидаторы для каждой формы
const setPreventDefaultSubmit = () => {
  // получаем список форм на странице
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  // сбрасываем стандартную отправку и устанавливаем слушатели на каждую форму из списка 
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
  });
}

// Запускаем слушатели всех кнопок
setEventListener();
setEventListenerPopupClose()

// Публикуем карточки по умолчанию 
addInitialCards();

// отменяем стандартную отправку форм
setPreventDefaultSubmit();

// запускаем владиацию форм
formValidatorCard.enableValidation();
formValidatorProfile.enableValidation();
