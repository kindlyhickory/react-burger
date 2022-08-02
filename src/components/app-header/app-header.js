import React, { useRef } from "react";
import { Logo, BurgerIcon, ProfileIcon, MenuIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./header.module.css";
import { NavLink, useLocation } from "react-router-dom";


const AppHeader = () => {

  const location = useLocation();


  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.header__container}>
        <nav>
          <ul className={`${headerStyles.list}`}>
            <li className={`${headerStyles.list__item} pl-5 pr-5 mt-4 mb-4 pt-4 pb-4 mr-2`}>
              <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
              <NavLink exact to='/' activeClassName={headerStyles.list__link_active} className={`${headerStyles.list__link} text text_type_main-default  ml-2`}>
                Конструктор
              </NavLink>
            </li>
            <li className={`${headerStyles.list__item} pl-5 pr-5 mt-4 mb-4 pt-4 pb-4`}>
              <MenuIcon type={location.pathname === '/not-existed-page' ? 'primary' : 'secondary'} />
              <NavLink exact to='' className={`${headerStyles.list__link} text text_type_main-default ml-2`}>Лента заказов</NavLink>
            </li>
          </ul>
        </nav>
        <Logo></Logo>
        <div className={`${headerStyles.personal} ${headerStyles.list__item}  pl-5 pr-5 mt-4 mb-4 pt-4 pb-4`}>
          <ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'} />
          <NavLink exact to="/profile" activeClassName={headerStyles.list__link_active} className={`${headerStyles.list__link} text text_type_main-default ml-2`}>Личный кабинет</NavLink>
        </div>

      </div>
    </header>
  )
}

export default AppHeader