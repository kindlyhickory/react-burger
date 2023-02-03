import React, { FC } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { signOut } from '../../services/actions/login';
// eslint-disable-next-line import/extensions
import { getCookie } from '../../utils/utils';
import styles from '../../pages/profile.module.css';
import { useDispatch } from '../../hooks';

// eslint-disable-next-line react/function-component-definition
const ProfileMenu:FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className={`${styles.profile__menuContainer} mr-15 pt-30`}>
      <ul className={`${styles.profile__menu} mb-20`}>
        <li className={styles.profile__link}>
          <NavLink to="/profile" exact activeClassName={styles.profile__linkItem_active} className={`${styles.profile__linkItem} text text_type_main-medium`}>
            Профиль
          </NavLink>
        </li>
        <li className={styles.profile__link}>
          <NavLink to="/profile/orders" exact activeClassName={styles.profile__linkItem_active} className={`${styles.profile__linkItem} text text_type_main-medium`}>
            История
          </NavLink>
        </li>
        <li className={styles.profile__link}>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <a
            onClick={() => {
              dispatch(signOut(getCookie('refreshToken'), history));
            }}
            className={`${styles.profile__linkItem} text text_type_main-medium text_color_inactive`}
          >
            Выход
          </a>
        </li>
      </ul>
      <p className={`${styles.profile__caption} text text_type_main-default text_color_inactive`}>
        В этом разделе вы можете
        изменить свои персональные данные
      </p>
    </div>
  );
};

export default ProfileMenu;
