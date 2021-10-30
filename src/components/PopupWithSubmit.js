import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
  }

  // - Перезаписывает родительский метод `setEventListeners`. 
  setEventListeners() {
    this._selectorPopup.querySelector('.popup__form').addEventListener('submit', (evt)=>{
      evt.preventDefault();
      this._data();
    })
    super.setEventListeners();
  }
    
  // метод передачи данных или функции
  submitCardDelit(data) {
      this._data = data;
  }
  
}
