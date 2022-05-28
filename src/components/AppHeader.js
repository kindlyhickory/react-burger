import React from "react";
import { Logo, BurgerIcon, ProfileIcon, MenuIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "../styles/header.module.css"

const AppHeader = (props) => {
  return (
    <>
      <header className={headerStyles.header}>
        <div className={headerStyles.header__container}>
          <nav>
            <ul className={`${headerStyles.list}`}>
              <li className={`${headerStyles.list__item} pl-5 pr-5 mt-4 mb-4 pt-4 pb-4 mr-2`}>
                <BurgerIcon type="primary" />
                <a className={`${headerStyles.list__link} text text_type_main-default ml-2`}>
                  Конструктор
                </a>
              </li>
              <li className={`${headerStyles.list__item} pl-5 pr-5 mt-4 mb-4 pt-4 pb-4`}>
                <MenuIcon type="secondary" />
                <a className={`${headerStyles.list__link} ${headerStyles.list__link_inactive} text text_type_main-default ml-2`}>Лента заказов</a>
              </li>
            </ul>
          </nav>
          <Logo></Logo>
          <div className={`${headerStyles.personal} ${headerStyles.list__item}  pl-5 pr-5 mt-4 mb-4 pt-4 pb-4`}>
            <ProfileIcon type="secondary" />
            <a className={`${headerStyles.list__link} ${headerStyles.list__link_inactive} text text_type_main-default ml-2`}>Личный кабинет</a>
          </div>

        </div>
      </header>
    </>
  )
}

export default AppHeader