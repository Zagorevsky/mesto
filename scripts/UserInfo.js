// ## Создайте класс `UserInfo`

// Класс `UserInfo` отвечает за управление отображением информации о пользователе на странице. Этот класс:

// - Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.


export default class UserInfo {

  constructor({fullname, description}) {
    this._fullname = fullname;
    this._description = description;
  }
  
  // - Содержит публичный метод `getUserInfo`, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
    fullname: this._fullname.textContent,
    description: this._description.textContent
    }
  }
  
  // - Содержит публичный метод `setUserInfo,` который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(userInfoNew) {
    this._fullname.textContent = userInfoNew.fullname;
    this._description.textContent = userInfoNew.description;
  }

}