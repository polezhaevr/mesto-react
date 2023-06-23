function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.item);
  }

  return (
    <div className="photo-post-template">
      <li className="photo-post__item">
        <button className="photo-post__btn-trash" type="button"></button>
        <img
          className="photo-post__image"
          alt={props.item.alt}
          src={props.item.link}
          onClick={handleCardClick}
        />
        <div className="photo-post__text-container">
          <h2 className="photo-post__text">{props.item.name}</h2>
          <div className="photo-post__container-count">
            <button className="photo-post__btn-like" type="button"></button>
            <p className="photo-post__count-likes">0</p>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Card;
