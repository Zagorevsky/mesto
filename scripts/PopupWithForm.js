// Создайте класс `PopupWithForm`, который наследует от `Popup`. Этот класс:

// - Кроме селектора попапа принимает в конструктор колбэк сабмита формы.

// Для каждого попапа создавайте свой экземпляр класса `PopupWithForm`.

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, {callbackSubmitForm}) {
    super(selectorPopup);
    this.callbackSubmitForm = callbackSubmitForm;
  }

  // - Содержит приватный метод `_getInputValues`, который собирает данные всех полей формы.
  _getInputValues () {
    this._inputList = this._selectorPopup.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues
  }

  // - Перезаписывает родительский метод `close`, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._selectorPopup.querySelector('.popup__form').reset();
  }

  // - Перезаписывает родительский метод `setEventListeners`. 
  //   Метод `_setEventListeners` класса `PopupWithForm` должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._selectorPopup.querySelector('.popup__form').addEventListener('submit', (evt)=>{
      evt.preventDefault();
      this.callbackSubmitForm(this._getInputValues());
    })
  }
}