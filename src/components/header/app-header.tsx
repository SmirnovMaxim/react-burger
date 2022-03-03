import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import {NavLink} from 'react-router-dom';
import {Routes} from '../../enums';
import Styles from './header.module.css';
import cn from 'classnames';

function AppHeader() {
  return (
    <header className={Styles.header}>
      <nav className={Styles.nav}>
        <div className={Styles.item}>
          <NavLink to={Routes.MAIN} activeClassName={Styles.activeLink} className={cn(Styles.link, 'text_color_inactive')} exact>
            <BurgerIcon type="secondary"/>
            <span>Конструктор</span>
          </NavLink>
        </div>
        <div className={Styles.item}>
          <NavLink to={Routes.FEED} activeClassName={Styles.activeLink} className={cn(Styles.link, 'text_color_inactive')} exact>
            <ListIcon type="secondary"/>
            <span>Лента заказов</span>
          </NavLink>
        </div>
        <div className={`${Styles.logo} ${Styles.item}`}>
          <NavLink to={Routes.MAIN}>
            <Logo/>
          </NavLink>
        </div>
        <div className={Styles.item}>
          <NavLink to={Routes.PROFILE} activeClassName={Styles.activeLink} className={cn(Styles.link, 'text_color_inactive')} exact>
            <ProfileIcon type="secondary"/>
            <span>Личный кабинет</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
