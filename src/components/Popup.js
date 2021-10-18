// Создайте класс `Popup`, который отвечает за открытие и закрытие попапа. Этот класс:

// - Принимает в конструктор единственный параметр — селектор попапа.
// - Содержит публичные методы `open` и `close`, которые отвечают за открытие и закрытие попапа.
// - Содержит приватный метод `_handleEscClose`, который содержит логику закрытия попапа клавишей Esc.
// - Содержит публичный метод `setEventListeners`, который добавляет слушатель клика иконке закрытия попапа.


export default class Popup {
  
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._selectorPopup.classList.add('popup_opened');
  }

  close() {
    this._selectorPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._selectorPopup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }


  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  }

}