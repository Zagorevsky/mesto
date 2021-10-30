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

// Свяжите класс Card c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. 
// Эта функция должна открывать попап с картинкой при клике на карточку.

export default class Card {

  constructor(dataCard, selectorCard, idProfile, { handleCardClick, handleLikeClick, handleDeleteIconClick }) {
    this._dataCard = dataCard;
    this._nameCard = dataCard.name;
    this._linkCard = dataCard.link;
    this._likes = dataCard.likes
    this._selectorCard = selectorCard;
    this._idProfile = idProfile;
    this.handleCardClick = handleCardClick;
    this.handleLikeClick = handleLikeClick;
    this.handleDeleteIconClick = handleDeleteIconClick;
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
  deleteCard = () => {
    // удаляем элемент и зануляем его
    this._element.remove();
    this._element = null;
  }

  // скрыть удаление карты
  _hideDelitCard() {
    if (this._dataCard.owner._id !== this._idProfile) {
      this._element.querySelector('.element__trash').classList.add('element_hidden');
    }
  }

  // Обработчик кнопки лайк
  _toggleLike = () => {
    this._elementLike.classList.toggle('element__like_active');
  }

  // устанавливаем наш лайк на фотку при загрузке с сервера
  _checkStatusLike = () => {
    const id = this._dataCard.likes.map(el => el._id);
    const _like = id.includes(this._idProfile);
    if (_like) {
      this._toggleLike();
    }
  }

  // Слушатели на карте
  _setEventListeners() {
    // добавляем слушатель клика по кнопке лайк
    this._elementLike = this._element.querySelector('.element__like');
    this._elementLike.addEventListener('click', () => {
      this.like = this._elementLike.classList.contains('element__like_active');
      this.handleLikeClick(this._dataCard._id, this.like);
      this._toggleLike();
    });
    // добавляем слушатель клика по кнопке корзина
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this.handleDeleteIconClick(this._dataCard._id);
    });
    // добавляем слушатель клика по картинке
    this._element.querySelector('.element__foto').addEventListener('click', this.handleCardClick);
  }
  
  // выводим кол-во лайков
  showNumberLikes(likes) {
    const _elementNumberLikes = this._element.querySelector('.element__number-likes');
    _elementNumberLikes.textContent = likes;
  }

  addCard() {
    // клонируем шаблон карточки
    this._element = this._getTemplate();
    const _elementFoto = this._element.querySelector('.element__foto');
    this._setEventListeners();
    // наполняем карточку содержимым - фото, заголовок и описание
    this._element.querySelector('.element__title').textContent = this._nameCard;
    _elementFoto.src = this._linkCard;
    _elementFoto.alt = this._nameCard;
    // устанавливаем кол-во лайков
    this.showNumberLikes(this._likes.length);
    // устанавливаем наш лайк на карте
    this._checkStatusLike();
    // запрещаем удаление чужих карт
    this._hideDelitCard();
    // возвращаем готовую карточку
    return this._element;
  }
}
