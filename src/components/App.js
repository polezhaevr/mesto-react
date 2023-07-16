import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import { CurrentUser } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarOpen] = React.useState(false);

  //Инфа о пользователе
  const [currentUser, setUser] = React.useState({});

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  //Обработка лайка карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((err) => console.log(err));
  }

  //Удаление карточки
  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => setCards(cards.filter((item) => item._id !== id)))
      .catch((err) => console.log(err));
  }

  //Редактирование данных пользователя
  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((data) => {
        setUser(data);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));

    console.log(setUser);
  }

  //Редактирвоание аватара
  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((data) => {
        setUser(data);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));

    console.log(setUser);
  }

  //Добавление новой карточки
  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleEditProfileClick() {
    setProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setAddOpen(true);
  }

  function handleEditAvatarClick() {
    setAvatarOpen(true);
  }

  function closeAllPopups() {
    setAvatarOpen(false);
    setProfileOpen(false);
    setAddOpen(false);
    setImageOpen(false);
  }

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [selectedCard, openCard] = React.useState({});
  const [isImageOpen, setImageOpen] = React.useState(false);

  function handleCardClick(card) {
    setImageOpen(true);
    openCard(card);
  }

  return (
    <CurrentUser.Provider value={currentUser}>
      <div className="App">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          cards={cards}
          onCardLike={handleCardLike}
        />
        <Footer />
        <ImagePopup
          item={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImageOpen}
        />
        /Попап открытия формы редактирвоания
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        /Попап формы добавления новых карточек
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        /Попап изменеия аватара
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        /Попап потверждения удаления карточки
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          textButton="Да"
        ></PopupWithForm>
      </div>
    </CurrentUser.Provider>
  );
}

export default App;
