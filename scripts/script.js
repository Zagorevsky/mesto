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
const addCard = document.querySelector('.profile__add-card');
// Получаем контейнер для размещения карточек с фото
const elements = document.querySelector('.elements');
// Получаем шаблон для карточек с фото
const elementTemplate = document.querySelector('#element').content;
// Получаем попап для редактирования профиля
const popupProfil = document.querySelector('.popup_profil');
// Получаем попап для добавления новой карты
const popupCard = document.querySelector('.popup_card');
// Получаем попап для просмотра картинки в попап
const popupImg = document.querySelector('.popup_img');
// Храним готовую карточку
let element
// Имя карточки и ссылка на карточку
let nameCards
let linkCards
//   Имя попап
let namePopup

// Слушатель кнопки - редактировать профиль
function listenProfileEdit () {
  profileEdit.addEventListener('click',createPopupProfil);
}

// Слушатель кнопки - добавить карту
function listenAddCard () {
  addCard.addEventListener('click', createPopupCard);
}

// Обработчик кнопки корзина
function delCards(evt) {
  evt.target.closest('.element').remove();
}
// Обработчик кнопки лайк
function toggleLike (evt) {
  evt.target.classList.toggle('element__like_active'); 
}

// Открыть попап
function openPopup (namePopup) {
  namePopup.classList.add('popup_opened');
} 

// Закрыть попап
function closePopup (namePopup) {
  namePopup.classList.remove('popup_opened');
}

// Создатель карточки Новое место с названием, фото, и слушателями кнопок: лайк и корзина
function addCards (nameCards, linkCards) {
  // клонируем шаблон карточки
  element = elementTemplate.querySelector('.element').cloneNode(true);
  // наполняем карточку содержимым - фото, заголовок и описание
  element.querySelector('.element__title').textContent = nameCards;
  element.querySelector('.element__foto').src = linkCards;
  element.querySelector('.element__foto').alt = `На фото ${nameCards}`;
  // добавляем слушатель клика по кнопке лайк
  element.querySelector('.element__like').addEventListener('click', toggleLike);
  // добавляем слушатель клика по кнопке корзина
  element.querySelector('.element__trash').addEventListener('click', delCards);
  // добавляем слушатель клика по картинке
  element.querySelector('.element__foto').addEventListener('click', openImages);
  // возвращаем готовую карточку
  return element;
}

// Обработчик клика по фото карточки
function openImages (evt) {
  // Получаем карточку по которой кликнули
  element = evt.target.closest('.element');
  // Наполняем попап данными из карточки
  popupImg.querySelector('.popup__image').src = element.querySelector('.element__foto').src;
  popupImg.querySelector('.popup__image').alt = element.querySelector('.element__foto').alt;
  popupImg.querySelector('.popup__title-img').textContent = element.querySelector('.element__title').textContent;
  // слушатель кнопки закрыть попап
  popupImg.querySelector('.popup__close').addEventListener('click',function(){closePopup(popupImg)});
  // Открываем попап
  openPopup (popupImg);
}

// Создатель попап для редактировать профиля
function createPopupProfil() {
  popupProfil.querySelector('.popup__form').reset();
  popupProfil.querySelectorAll('.popup__txt')[0].value = fullNameProfile.textContent;
  popupProfil.querySelectorAll('.popup__txt')[1].value = descriptionProfile.textContent;
  openPopup(popupProfil);
  // слушатель кнопки закрыть попап
  popupProfil.querySelector('.popup__close').addEventListener('click', function(){closePopup(popupProfil)});
  // слушатель кнопки отправить форму
  popupProfil.querySelector('.popup__form').addEventListener('submit', sendFormProfil);
}

// Обработчик кнопки - сохранить форму в профиль попап
function sendFormProfil(event) {
  // Отменяем стандартную отправку формы
  event.preventDefault();
  // Наполняем данными попап
  fullNameProfile.textContent = popupProfil.querySelectorAll('.popup__txt')[0].value;
  descriptionProfile.textContent = popupProfil.querySelectorAll('.popup__txt')[1].value;
  // Закрываем попап
  closePopup(popupProfil);
}

// Создатель попап для создания карточки Новое место
function createPopupCard(){
  // Делаем сброс формы
  popupCard.querySelector('.popup__form').reset();
  // Открываем попап
  openPopup(popupCard);
  // слушатель кнопки закрыть попап Новое место
  popupCard.querySelector('.popup__close').addEventListener('click',()=>{closePopup(popupCard)});
  // слушатель кнопки отправить форму Новое место
  popupCard.querySelector('.popup__form').addEventListener('submit', sendFormNewCard);
};

// Создатель карточки Новое место
function sendFormNewCard(event) {
  // Отменяем стандартную отправку формы
  event.preventDefault();
  // Получае данные из формы
  nameCards = popupCard.querySelectorAll('.popup__txt')[0].value;
  linkCards = popupCard.querySelectorAll('.popup__txt')[1].value;
  // Добавляем новую карточку в начало контейнера
  elements.prepend(addCards(nameCards, linkCards));
  // Добавляем новую карточку в базу данных - массив
  addNewCard(nameCards, linkCards);
  // Удаляем 7-мую карточку
  elements.querySelectorAll('.element')[6].remove();
  // Закрываем попап
  closePopup(popupCard);
}

// Записываем карточку в базу данных - массив
function addNewCard(nameCards, linkCards) {
  initialCards.unshift({
   name: nameCards,
   link: linkCards
  });
 }

// Начальный публикатор базы данных всех карт
function addInitialCards () {
  initialCards.forEach(function (item) {
    nameCards = item.name;
    linkCards = item.link;
    elements.append(addCards(nameCards, linkCards));
  });
}

// Запускаем слушатель кнопки - редактировать профиль
listenProfileEdit();
// Запускаем слушатель кнопки - добавить новое место
listenAddCard();
// Публикуем карточки по умолчанию 
addInitialCards();
