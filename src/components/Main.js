import React from "react";
import Card from "./Card";
import { CurrentUser } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUserContext = React.useContext(CurrentUser);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img
            className="profile__img-avatar"
            src={currentUserContext.avatar}
            alt="Аватарка профиля"
          />
        </div>
        <div className="profile__container-about-profile">
          <h1 className="profile__name-title">{currentUserContext.name}</h1>
          <button
            className="profile__btn-edit"
            aria-label="Изменить имя и описание профиля"
            type="button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__text">{currentUserContext.about}</p>
        </div>
        <button
          className="profile__btn-pic-add"
          aria-label="Добавить картинку"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="photo-post">
        <ul className="photo-post__list">
          {props.cards.map((item) => (
            <Card
              item={item}
              key={item._id}
              onCardLike={props.onCardLike}
              onCardClick={item}
              onCardDelete={props.onCardDelete}
              {...props}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
