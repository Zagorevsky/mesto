// Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open. 
// В методе open класса PopupWithImage нужно вставлять в попап картинку и атрибут src изображения.

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  constructor(selectorPopup) {
    super(selectorPopup);
    this.imagePopup = this._selectorPopup.querySelector('.popup__image');
    this.titleImagePopup = this._selectorPopup.querySelector('.popup__title-img')
  }

  open(evt) {
    this.imagePopup.src = evt.target.src;
    this.imagePopup.alt = evt.target.alt;
    this.titleImagePopup.textContent = evt.target.alt;
    super.open();
  }
}