// Требования к коду
// Эта самостоятельная работа отличается от предыдущих. До сих пор от вас требовалось реализовать какую-то функциональность. Вы думали, как заставить кнопки работать или сделать так, чтобы попап появлялся и исчезал. Сейчас весь функционал уже готов. Ваша задача — начать работу по организации кода.

// Первое требование — добавить классы Card и FormValidator в код. Каждый из них выполняет строго одну задачу. Всё, что относится к решению этой задачи, находится внутри класса.

// Второе требование — разбить JavaScript на модули. В проекте должно быть три js-файла:

// Card.js с кодом класса Card,
// FormValidator.js с кодом класса FormValidator,
// index.js со всем остальным кодом.
// Классы Card и FormValidator экспортируются из соответствующих файлов, импортируются в index.js и используются в нём.

// Отдельные js-файлы подключены в index.html как модули.


// база данных карточек для начала работы
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
const elements = document.querySelector('.elements');
// Получаем попап для редактирования профиля
const popupProfile = document.querySelector('.popup_profile');
// Получаем попап для добавления новой карты
const popupCard = document.querySelector('.popup_card');

const cardSelector = '#element';

const fullNameProfilePopup = popupProfile.querySelector('#full-name');
const descriptionProfilePopup = popupProfile.querySelector('#description');
const popupContenProfile = popupProfile.querySelector('.popup__content');
const popupContenCard = popupCard.querySelector('.popup__content');
// const popupContenImg = popupImg.querySelector('.popup__content');

// Устанавливаем слушатели на закрытие всех попап
function setEventListenerPopupClose() {
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

function setEventListener() {
// Слушатель кнопки - редактировать профиль
  profileEdit.addEventListener('click',openPopupProfil);
// Слушатель кнопки - добавить карту
  buttonAddCard.addEventListener('click', openPopupCard);
// Слушатель кнопки отправить форму Профиль
  popupProfile.querySelector('.popup__form').addEventListener('submit', sendFormProfil);
// Слушатель кнопки отправить форму Новое место
  popupCard.querySelector('.popup__form').addEventListener('submit', sendFormNewCard);
}

// закрытие попап по клавише ESC
function closeByEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Открыть попап
function openPopup (namePopup) {
  document.addEventListener('keydown', closeByEscape);
  namePopup.classList.add('popup_opened');
}

// Закрыть попап
function closePopup (namePopup) {
  namePopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
}

// активность кнопки и сброс ошибок попап
const validityOpenPopup = (namePopup) => {
  const inputList = Array.from(namePopup.querySelectorAll('.popup__input'));
  const submitButtonSelector = '.popup__button';
  const inactiveButtonClass = 'popup__button_disabled';
  const inputErrorClass = 'popup__input_type_error';
  const errorClass = 'popup__error_visible';
  // проверяем и устанавливаем активность кнопки на момент открытия попап
  toggleButtonState (namePopup, inputList, submitButtonSelector, inactiveButtonClass);
  // сбрасываем ошибки открываемой формы
  inputList.forEach(inputElement => {
    const errorElement = namePopup.querySelector(`#${inputElement.id}-error`);
    hideErrorInput(errorElement, inputElement, inputErrorClass, errorClass);
  });
}

// Октрыть попап для редактировать профиля
function openPopupProfil() {
  fullNameProfilePopup.value = fullNameProfile.textContent;
  descriptionProfilePopup.value = descriptionProfile.textContent;
  // Удаляем сообщения об ошибках
  validityOpenPopup(popupProfile);
  openPopup(popupProfile);
}

// Обработчик отправки формы профиль 
function sendFormProfil() {
  // Наполняем данными попап
  fullNameProfile.textContent = fullNameProfilePopup.value;
  descriptionProfile.textContent = descriptionProfilePopup.value;
  // Закрываем попап
  closePopup(popupProfile);
}

// Открыть попап для создания карточки Новое место
function openPopupCard(){
  // Делаем сброс формы
  popupCard.querySelector('.popup__form').reset();
  // Удаляем сообщения об ошибках
  validityOpenPopup(popupCard);
  // Открываем попап
  openPopup(popupCard);
}

// Создатель карточки Новое место
function sendFormNewCard() {
  // Получае данные из формы
  const nameCard = popupCard.querySelector('[name="card-title"]').value;
  const linkCard = popupCard.querySelector('[name="card-link"]').value;
  // Создаем новый экземпляр класса Card
  const card = new Card(nameCard, linkCard, cardSelector);
  // Добавляем новую карточку в начало контейнера
  elements.prepend(card.addCard());
  // Закрываем попап
  closePopup(popupCard);
}


function addInitialCards () {
// Начальный публикатор базы данных всех карт
  initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, cardSelector);
    const cardElement = card.addCard();

  // Добавляем в DOM
    document.querySelector('.elements').append(cardElement);
  });
}

// Запускаем слушатели всех кнопок
setEventListener();
setEventListenerPopupClose()

// Публикуем карточки по умолчанию 
addInitialCards();


