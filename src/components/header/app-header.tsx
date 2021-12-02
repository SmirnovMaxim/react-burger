import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from './header.module.css';

function AppHeader() {
  return (
    <header className={Styles.header}>
      <nav className={Styles.nav}>
        <div className={Styles.item}>
          <BurgerIcon type="primary"/>
          <span>Конструктор</span>
        </div>
        <div className={Styles.item}>
          <ListIcon type="primary"/>
          <span>Лента заказов</span>
        </div>
        <div className={`${Styles.logo} ${Styles.item}`}>
          <Logo/>
        </div>
        <div className={Styles.item}>
          <ProfileIcon type="primary"/>
          <span>Личный кабинет</span>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
