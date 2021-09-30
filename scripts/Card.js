// Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:

// принимает в конструктор её данные и селектор её template-элемента;
// содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// содержит приватные методы для каждого обработчика;
// содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
// Для каждой карточки создайте экземпляр класса Card.

// Первое требование — добавить классы Card и FormValidator в код. Каждый из них выполняет строго одну задачу. Всё, что относится к решению этой задачи, находится внутри класса.

// Второе требование — разбить JavaScript на модули. В проекте должно быть три js-файла:

// Card.js с кодом класса Card,
// FormValidator.js с кодом класса FormValidator,
// index.js со всем остальным кодом.
// Классы Card и FormValidator экспортируются из соответствующих файлов, импортируются в index.js и используются в нём.

// Отдельные js-файлы подключены в index.html как модули.

import { openImagePopup } from "./index.js"

export class Card {

  constructor(nameCard, linkCard, selectorCard) {
    this._nameCard = nameCard;
    this._linkCard = linkCard;
    this._selectorCard = selectorCard;
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._selectorCard)
      .content.querySelector('.element')
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  // Удаляем карту 
  _deleteCard = (evt) => {
    evt.target.closest('.element').remove();
  }

  // Обработчик кнопки лайк
  _toggleLike = (evt) => {
    evt.target.classList.toggle('element__like_active');
  }

  // Открытие картинки в попап
  _openImagePopup = (evt) => {
    openImagePopup(evt);
  }

  // Слушатели на карте
  _setEventListeners() {
    // добавляем слушатель клика по кнопке лайк
    this.element.querySelector('.element__like').addEventListener('click', this._toggleLike);
    // // добавляем слушатель клика по кнопке корзина
    this.element.querySelector('.element__trash').addEventListener('click', this._deleteCard);
    // // добавляем слушатель клика по картинке
    this.element.querySelector('.element__foto').addEventListener('click', this._openImagePopup);
  }

  addCard() {
    // клонируем шаблон карточки
    this.element = this._getTemplate();
    this._setEventListeners();
    // наполняем карточку содержимым - фото, заголовок и описание
    this.element.querySelector('.element__title').textContent = this._nameCard;
    this.element.querySelector('.element__foto').src = this._linkCard;
    this.element.querySelector('.element__foto').alt = this._nameCard;
    // возвращаем готовую карточку
    return this.element;
  }
}