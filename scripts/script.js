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
// Получаем шаблон для карточек с фото
const elementTemplate = document.querySelector('#element').content;
// Получаем попап для редактирования профиля
const popupProfile = document.querySelector('.popup_profile');
// Получаем попап для добавления новой карты
const popupCard = document.querySelector('.popup_card');
// Получаем попап для просмотра картинки в попап
const popupImg = document.querySelector('.popup_img');

const keyСodeKeyboard = 'Escape';
const fullNameProfilePopup = popupProfile.querySelector('#full-name');
const descriptionProfilePopup = popupProfile.querySelector('#description');
const popupContenProfile = popupProfile.querySelector('.popup__content');
const popupContenCard = popupCard.querySelector('.popup__content');
const popupContenImg = popupImg.querySelector('.popup__content');



function setEventListener() {
// Cлушатель клика на оверлей попапа Профиль
  popupProfile.addEventListener('click', ()=>{closePopup(popupProfile)}); 
  popupContenProfile.addEventListener('click', (event)=>{event.stopPropagation()});
// Слушатель клика на оверлей попап Новое место
  popupCard.addEventListener('click', ()=>{closePopup(popupCard)});
  popupContenCard.addEventListener('click', (event)=>{event.stopPropagation()});
// Слушатель клика на оверлей попап Большое Фото
  popupImg.addEventListener('click', ()=>{closePopup(popupImg)});
  popupContenImg.addEventListener('click', (event)=>{event.stopPropagation()});

  // Слушатель клавиатуры 
  document.addEventListener('keydown', (event) => {
    // если нажата нужная клавиша 
    if (event.key === keyСodeKeyboard) {
      // ищем активный попап 
      const activePopup = document.querySelector('.popup_opened');
      if (activePopup !== null) {
        // если есть активный попап, то закрываем его
        closePopup (activePopup);
      }
    }
    });

// Слушатель кнопки - редактировать профиль
  profileEdit.addEventListener('click',openPopupProfil);
// Слушатель кнопки - добавить карту
  buttonAddCard.addEventListener('click', openPopupCard);
// Слушатель кнопки закрыть попап Профиль
  popupProfile.querySelector('.popup__close').addEventListener('click', ()=>{closePopup(popupProfile)});
// Слушатель кнопки закрыть попап Новое место
popupCard.querySelector('.popup__close').addEventListener('click',()=>{closePopup(popupCard)});
// Слушатель кнопки закрыть попап Большое Фото
  popupImg.querySelector('.popup__close').addEventListener('click', ()=>{closePopup(popupImg)});
// Слушатель кнопки отправить форму Профиль
  popupProfile.querySelector('.popup__form').addEventListener('submit', sendFormProfil);
// Слушатель кнопки отправить форму Новое место
  popupCard.querySelector('.popup__form').addEventListener('submit', sendFormNewCard);
}


// Обработчик кнопки корзина
function deleteCard(evt) {
  evt.target.closest('.element').remove();
}
// Обработчик кнопки лайк
function toggleLike (evt) {
  evt.target.classList.toggle('element__like_active'); 
}

// Открыть попап
function openPopup (namePopup) {
  if (namePopup === popupImg) {
    namePopup.classList.add('popup_opened');
  } else {
    validityOpenPopup(namePopup);
    namePopup.classList.add('popup_opened');
  }
}

// Закрыть попап
function closePopup (namePopup) {
  namePopup.classList.remove('popup_opened');
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

// Создатель карточки Новое место с названием, фото, и слушателями кнопок: лайк и корзина
function addCard (nameCard, linkCard) {
  // клонируем шаблон карточки
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  // наполняем карточку содержимым - фото, заголовок и описание
  element.querySelector('.element__title').textContent = nameCard;
  element.querySelector('.element__foto').src = linkCard;
  element.querySelector('.element__foto').alt = `На фото ${nameCard}`;
  // добавляем слушатель клика по кнопке лайк
  element.querySelector('.element__like').addEventListener('click', toggleLike);
  // добавляем слушатель клика по кнопке корзина
  element.querySelector('.element__trash').addEventListener('click', deleteCard);
  // добавляем слушатель клика по картинке
  element.querySelector('.element__foto').addEventListener('click', openImage);
  // возвращаем готовую карточку
  return element;
}

// Обработчик клика по фото карточки
function openImage (evt) {
  // Получаем карточку по которой кликнули
  const element = evt.target.closest('.element');
  // Наполняем попап данными из карточки
  popupImg.querySelector('.popup__image').src = element.querySelector('.element__foto').src;
  popupImg.querySelector('.popup__image').alt = element.querySelector('.element__foto').alt;
  popupImg.querySelector('.popup__title-img').textContent = element.querySelector('.element__title').textContent;
  // Открываем попап
  openPopup (popupImg);
}

// Октрыть попап для редактировать профиля
function openPopupProfil() {
  fullNameProfilePopup.value = fullNameProfile.textContent;
  descriptionProfilePopup.value = descriptionProfile.textContent;
  openPopup(popupProfile);
}

// Обработчик отправки формы профиль 
function sendFormProfil() {
  // если кнопка отправить в состоянии заблокированно , то функция не выполняется
  if (!popupProfile.querySelector('.popup__button_disabled')) {
  // Наполняем данными попап
  fullNameProfile.textContent = fullNameProfilePopup.value;
  descriptionProfile.textContent = descriptionProfilePopup.value;
  // Закрываем попап
  closePopup(popupProfile);
  }
}

// Открыть попап для создания карточки Новое место
function openPopupCard(){
  // Делаем сброс формы
  popupCard.querySelector('.popup__form').reset();
  // Открываем попап
  openPopup(popupCard);
};

// Создатель карточки Новое место
function sendFormNewCard() {
  // если кнопка отправить в состоянии заблокированно , то функция не выполняется
  if (!popupCard.querySelector('.popup__button_disabled')) {
  // Получае данные из формы
  const nameCard = popupCard.querySelector('[name="card-title"]').value;
  const linkCard = popupCard.querySelector('[name="card-link"]').value;
  // Добавляем новую карточку в начало контейнера
  elements.prepend(addCard(nameCard, linkCard));
  // Закрываем попап
  closePopup(popupCard);
}
}

// Начальный публикатор базы данных всех карт
function addInitialCards () {
  initialCards.forEach(function (item) {
    const nameCard = item.name;
    const linkCard = item.link;
    elements.append(addCard(nameCard, linkCard));
  });
}

// Запускаем слушатели всех кнопок
setEventListener();

// Публикуем карточки по умолчанию 
addInitialCards();
