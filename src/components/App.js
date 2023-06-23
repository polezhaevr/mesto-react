import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';


function App() {

  const [isEditProfilePopupOpen, setProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarOpen] = React.useState(false);


  function handleEditProfileClick() {
    setProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setAddOpen(true);
  }

  function handleEditAvatarClick() {
    setAvatarOpen(true);
  }

  const [isPopupClosed, setClosed] = React.useState(false);

  function closeAllPopups() {
    setClosed(true);
    setAvatarOpen(false);
    setProfileOpen(false);
    setAddOpen(false);
    setImageOpen(false);
  }

  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
  }, [])

  const [selectedCard, openCard] = React.useState({})
  const [isImageOpen, setImageOpen] = React.useState(false)


  function handleCardClick(card) {
    setImageOpen(true);
    openCard(card);
  }

  return (

    <div className="App">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
      />

      <Footer />

      <ImagePopup
        item={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImageOpen}
      />

      /Попап открытия формы редактирвоания
      <PopupWithForm
        name='profile'
        title='Редактировать профиль'
        textButton='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onClosed={isPopupClosed}
      >
        <input id="text-name-input"
          className="popup__input-text popup__input-text_insert_nameinput" type="text"
          placeholder="Имя Фамилия" name='name' required />
        <span className="text-name-input-error popup__input-error">Вы пропустили это поле.</span>
        <input id="text-input" name='about'
          className="popup__input-text popup__input-text_insert_jobinput" type="text"
          placeholder="Описание" required />
        <span className="text-input-error popup__input-error">Вы пропустили это поле.</span>
      </PopupWithForm>

      /Попап формы добавления новых карточек
      <PopupWithForm
        name='add'
        title='Новое место'
        textButton='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onClosed={isPopupClosed}
      >
        <input id="text-input-link"
          className="popup__input-text popup__input-text_insert_textinput" name='name' type="text"
          placeholder="Название" required />
        <span className="text-input-link-error popup__input-error">Вы пропустили это поле.</span>
        <input id="url-input" className="popup__input-text popup__input-text_insert_linkinput" type="url"
          placeholder="Ссылка на картинку" name='link' required />
        <span className="url-input-error popup__input-error">Введите адрес сайта.</span>
      </PopupWithForm>

      /Попап изменеия аватара
      <PopupWithForm
        name='update-avatar'
        title='Обновить аватар'
        textButton='Cохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onClosed={isPopupClosed}
      >
        <input id="avatar-link" className="popup__input-text popup__input-text_insert_linkinput" type="url"
          placeholder="Ссылка на картинку" name="avatar" required />
        <span className="avatar-link-error popup__input-error">Введите адрес картинки.</span>
      </PopupWithForm>

      /Попап потверждения удаления карточки
      <PopupWithForm
        name='delete'
        title='Вы уверены?'
        textButton='Да'
      >

      </PopupWithForm>

    </div>

  );
}

export default App;
