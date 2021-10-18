// Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open. 
// В методе open класса PopupWithImage нужно вставлять в попап картинку и атрибут src изображения.

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  constructor(selectorPopup) {
    super(selectorPopup)
  }

  open(evt) {
    this._selectorPopup.querySelector('.popup__image').src = evt.target.src;
    this._selectorPopup.querySelector('.popup__image').alt = evt.target.alt;
    this._selectorPopup.querySelector('.popup__title-img').textContent = evt.target.alt;
    super.open();
  }
}