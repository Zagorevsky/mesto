
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';
import {
  // база данных карточек
  initialCards,
  // Получаем текущее содержание профиля
  fullNameProfile,
  descriptionProfile,
  avatarProfile,
  // Получаем кнопку редактировать аватар
  avatarEdit,
  // Получаем кнопку редактировать профиль
  profileEdit,
  // Получаем кнопку добавить карту
  buttonAddCard,
  // Получаем контейнер для размещения карточек с фото
  cardsContainer,
  // Получаем попап для редактирования профиля
  popupProfile,
  // Получаем попап для добавления новой карты
  popupCard,
  // Получаем попап для открытия картинки в попап
  popupImg,
  // Получаем попап для редактирования аватара
  popupAvatar,
  // Получаем попап для подтверждения удаления картинки
  popupDelitCard,
  cardSelector,
  // профиль в попап
  fullNameProfilePopup,
  descriptionProfilePopup,
  //  ключ авторизации
  authorization,
  // текст кнопок для попап
  buttonTextSave,
  buttonTextCreate,
  buttonTextLoad,
  // данные для валидации
  config
} from '../utils/variables.js'

// экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29',
  headers: {
    authorization: authorization,
    'Content-Type': 'application/json'
  }
});

// экземпляр класса Иноформация о пользователе
const userInfo = new UserInfo({
  fullname: fullNameProfile,
  description: descriptionProfile,
  avatar: avatarProfile,
});

//  экземпляр класса валидации формы новой карты
const formValidatorCard = new FormValidator(config, popupCard);

// экземпляр класса валидации формы профиля
const formValidatorProfile = new FormValidator(config, popupProfile);

// экземпляр класса валидации формы avatar
const formValidatorAvatar = new FormValidator(config, popupAvatar);

// экземпляр класса попап большая картинка
const popupWithImage = new PopupWithImage(popupImg);

// экземпляр класса попап подтверждения удаления
const popupWithSubmit = new PopupWithSubmit(popupDelitCard);

// первичная загрузка данных пользователя
api.getInitialProfile()
  .then((profile) => {
    userInfo.setUserInfo({
      fullname: profile.name,
      description: profile.about,
      avatar: profile.avatar,
    });

    return profile._id;
  })
  .then((idProfile) => {
    // получаем данные карточек с сервера по готовности данных с профиля
    api.getInitialCards()
      .then((result) => {

        // функция создания Новой карточки
        const generatorCard = (dataCard, idProfile) => {
          const card = new Card(dataCard, cardSelector, idProfile, {
            handleCardClick: (evt) => { popupWithImage.open(evt) },
            handleLikeClick: (id, like) => {
              if (like) {
                api.deleteLikesToServer(id)
                  .then((res) => {
                    // переключаем значек лайка после получения ответа сервера
                    card.toggleLike();
                    // выводим кол-во лайков на экран
                    card.showNumberLikes(res.likes.length);
                  })
                  .catch((err) => { console.log(err); });
              } else {
                api.addLikesToServer(id)
                  .then((res) => {
                    // переключаем значек лайка после получения ответа сервера
                    card.toggleLike();
                    // выводим кол-во лайков на экран
                    card.showNumberLikes(res.likes.length);
                  })
                  .catch((err) => { console.log(err); });
              }
            },
            handleDeleteIconClick: (idCard) => {
              popupWithSubmit.submitCardDelit(() => {
                api.deleteCardToServer(idCard)
                  .then(() => {
                    popupWithSubmit.close();
                    card.deleteCard();
                  })
                  .catch((err) => { console.log(err); });
              })
              popupWithSubmit.open();
            }
          });
          return card.addCard();
        }

        // Начальный публикатор базы данных всех карт
        const defaultCardList = new Section({
          items: result,
          renderer: (item) => {
            const cardElement = generatorCard(item, idProfile);
            defaultCardList.addItem(cardElement);
          }
        }, cardsContainer);
        defaultCardList.renderItems(result);
        
        // экземпляр класса попап - редактировать профиль
        const popupWithFormProfile = new PopupWithForm(popupProfile, {
          callbackSubmitForm: (userInfoPopup) => {
            // устанавливаем текст на кнопку - сохранение...
            popupWithFormProfile.renderLoading(buttonTextLoad);
            api.addProfileToServer({
              name: userInfoPopup.fullname,
              about: userInfoPopup.description
            })
              .then((profile) => {
                userInfo.setUserInfo({
                  fullname: profile.name,
                  description: profile.about,
                  avatar: profile.avatar,
                });
                popupWithFormProfile.close();
              })
              .catch((err) => {
                console.log(err); // выведем ошибку в консоль
              })
              .finally(() => { popupWithFormProfile.renderLoading(buttonTextSave); });
          }
        });

        // экземпляр класса попап - редактировать аватар
        const popupWithFormAvatar = new PopupWithForm(popupAvatar, {
          callbackSubmitForm: (data) => {
            // устанавливаем текст на кнопку - сохранение...
            popupWithFormAvatar.renderLoading(buttonTextLoad);
            api.addAvatarToServer({
              avatar: data.avatar,
            })
              .then((profile) => {
                userInfo.setUserInfo({
                  fullname: profile.name,
                  description: profile.about,
                  avatar: profile.avatar,
                });
                popupWithFormAvatar.close();
              })
              .catch((err) => {
                console.log(err); // выведем ошибку в консоль
              })
              .finally(() => { popupWithFormAvatar.renderLoading(buttonTextSave); });
          }
        });

        // экземпляр класса попап - Новая карточка
        const popupWithFormCard = new PopupWithForm(popupCard, {
          callbackSubmitForm: (dataCard) => {
            // устанавливаем текст на кнопку - сохранение...
            popupWithFormCard.renderLoading(buttonTextLoad);
            api.addCardToServer({
              name: dataCard.name,
              link: dataCard.link,
            })
              .then((dataCard) => {
                // const defaultCardList = new Section({}, cardsContainer);
                const cardElement = generatorCard(dataCard, dataCard.owner._id);
                defaultCardList.addItem(cardElement);
                popupWithFormCard.close()
              })
              .catch((err) => {
                console.log(err); // выведем ошибку в консоль
              })
              .finally(() => { popupWithFormCard.renderLoading(buttonTextCreate); });
          }
        });

        // Слушатель кнопки - редактировать аватар
        avatarEdit.addEventListener('click', () => {
          // Сброс валидации
          formValidatorAvatar.resetValidation();
          // Открываем попап аватар
          popupWithFormAvatar.open();
        });

        // Слушатель кнопки - редактировать Профиль
        profileEdit.addEventListener('click', () => {
          const dataUserInfo = userInfo.getUserInfo();
          fullNameProfilePopup.value = dataUserInfo.fullname;
          descriptionProfilePopup.value = dataUserInfo.description;
          // Сброс валидации
          formValidatorProfile.resetValidation();
          // Открываем попап Профиль
          popupWithFormProfile.open();
        });

        // Слушатель кнопки - Новая карта
        buttonAddCard.addEventListener('click', () => {
          // Сброс валидации
          formValidatorCard.resetValidation();
          // Открываем попап Новая карта
          popupWithFormCard.open()
        });

        // подключаем слушатели 
        popupWithFormCard.setEventListeners();
        popupWithImage.setEventListeners();
        popupWithFormProfile.setEventListeners();
        popupWithFormAvatar.setEventListeners();
        popupWithSubmit.setEventListeners();

        // подключаем владиацию форм
        formValidatorCard.enableValidation();
        formValidatorProfile.enableValidation();
        formValidatorAvatar.enableValidation();
        
      })
      .catch((err) => { console.log(err); });
  })
  .catch((err) => { console.log(err); }
  );
