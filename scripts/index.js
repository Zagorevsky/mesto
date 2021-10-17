// Работа 7
// Первое требование — добавить классы Card и FormValidator в код. Каждый из них выполняет строго одну задачу. 
// Всё, что относится к решению этой задачи, находится внутри класса.
// Второе требование — разбить JavaScript на модули. В проекте должно быть три js-файла:

// Card.js с кодом класса Card,
// FormValidator.js с кодом класса FormValidator,
// index.js со всем остальным кодом.
// Классы Card и FormValidator экспортируются из соответствующих файлов, импортируются в index.js и используются в нём.
// Отдельные js-файлы подключены в index.html как модули.

// Работа 8
// - Добавьте в проект классы `Section`, `Popup`, `PopupWithForm`, `PopupWithImage` и `UserInfo`. Каждый из них выполняет  строго одну задачу. Всё, что относится к решению этой задачи, находится внутри класса.
// - Если классы нужно связать друг с другом, делайте это передаваемой в конструктор функцией-колбэком.
// - Все классы должны быть вынесены в отдельные файлы.
// - В файле `index.js` должно остаться только создание классов и добавление некоторых обработчиков.

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import {
  // база данных карточек
  initialCards,
  // Получаем текущее содержание профиля
  fullNameProfile,
  descriptionProfile,
  // Получаем кнопку редактировать профиль
  profileEdit,
  // Получаем кнопку добавить карту
  buttonAddCard,
  // Получаем контейнер для размещения карточек с фото
  cardsContainer,
  // Получаем попап для редактирования профиля
  popupProfile,
  // Получаем попап для добавления новой карты
  popupCard,
  popupImg,
  cardSelector,
  // профиль в попап
  fullNameProfilePopup,
  descriptionProfilePopup,
  // данные для валидации
  config } from '../utils/variables.js'


//  экземпляр класса валидации формы новой карты
const formValidatorCard = new FormValidator(config, popupCard);

// экземпляр класса валидации формы профиля
const formValidatorProfile = new FormValidator(config, popupProfile);

// экземпляр класса попап большая картинка
const popupWithImage = new PopupWithImage(popupImg);

// экземпляр класса Инофрмация о пользователе
const userInfo = new UserInfo({
  fullname: fullNameProfile,
  description: descriptionProfile
});


// экземпляр класса попап - Новая карточка
const popupWithFormCard = new PopupWithForm(popupCard, {
  callbackSubmitForm: (dataCard) => {
    const card = new Card(dataCard, cardSelector, {
      handleCardClick: (evt) => { popupWithImage.open(evt) }
    })
    const cardElement = card.addCard();
    cardsContainer.prepend(cardElement);
    popupWithFormCard.close()
  }
});

// экземпляр класса попап - Профиль
const popupWithFormProfile = new PopupWithForm(popupProfile, {
  callbackSubmitForm: (userInfoPopup) => {
    userInfo.setUserInfo(userInfoPopup);
    popupWithFormProfile.close();
  }
});

// Начальный публикатор базы данных всех карт
const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardSelector, {
      handleCardClick: (evt) => { popupWithImage.open(evt) }
    })
    const cardElement = card.addCard();
    defaultCardList.addItem(cardElement);
  }
}, cardsContainer);

defaultCardList.renderItems();

// Слушатель кнопки - редактировать Профиль
profileEdit.addEventListener('click', () => {
  const dataUserInfo = userInfo.getUserInfo();
  fullNameProfilePopup.value = dataUserInfo.fullname;
  descriptionProfilePopup.value = dataUserInfo.description;
  // Сброс валидации
  formValidatorProfile.resetValidation();
  // Открываем попап Профиль
  popupWithFormProfile.open();
});

// Слушатель кнопки - Новая карта
buttonAddCard.addEventListener('click', () => {
  // Сброс валидации
  formValidatorCard.resetValidation();
  // Открываем попап Новая карта
  popupWithFormCard.open()
});

// подключаем слушатели 
popupWithFormCard.setEventListeners();
popupWithImage.setEventListeners();
popupWithFormProfile.setEventListeners();


// подключаем владиацию форм
formValidatorCard.enableValidation();
formValidatorProfile.enableValidation();
