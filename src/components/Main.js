import React from 'react';
import api from '../utils/Api'
import Card from "./Card";

function Main(props) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setuserDescription] = React.useState('');
    const [userAvatar, setuserAvatar] = React.useState('');

    React.useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setUserName(data.name)
                setuserDescription(data.about);
                setuserAvatar(data.avatar)
            })
    }, [])

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                    <img className="profile__img-avatar" src={userAvatar}
                        alt="Аватарка профиля" />
                </div>
                <div className="profile__container-about-profile">
                    <h1 className="profile__name-title">{userName}</h1>
                    <button className="profile__btn-edit" aria-label="Изменить имя и описание профиля" type="button"
                        onClick={props.onEditProfile}>
                    </button>
                    <p className="profile__text">{userDescription}</p>
                </div>
                <button className="profile__btn-pic-add" aria-label="Добавить картинку" type="button"
                    onClick={props.onAddPlace}>
                </button>
            </section>

            <section className="photo-post">
                <ul className="photo-post__list">
                    {props.cards.map(item => (
                        <Card item={item} key={item._id}  {...props} />
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default Main; 