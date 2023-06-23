import React from "react";
import logo from "../styles/images/header-logo.svg";

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип шапки сервиса по редактированию фотографий - Место"
      />
    </header>
  );
}

export default Header;
