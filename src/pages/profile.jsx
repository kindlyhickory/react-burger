import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setUserEditFormValue, USER_EDIT_FORM_CHANGE_PASSWORD_VISION } from '../services/actions/profileEdit';
import { getCookie } from '../utils/utils';
import styles from './profile.module.css';
import { useHistory } from 'react-router-dom';
import { signOut } from "../services/actions/login"


function ProfilePage() {

  const dispatch = useDispatch();
  const history = useHistory();

  const { name, email, password } = useSelector(store => store.editProfile.form);
  const { isPasswordHide } = useSelector(store => store.editProfile);

  const currentUser = useSelector(store => store.user.user);

  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const onIconClick = (e, ref) => {
    setTimeout(() => {
      passwordRef.current.focus()
    }, 0)
    if (ref.current.hasAttribute('disabled')) {
      ref.current.removeAttribute('disabled');
      alert(true);
    } else if (!ref.current.hasAttribute('disabled')) {
      ref.current.setAttribute('disabled', 'disabled');
      alert(false);
    }

  }

  const onFormChange = (e) => {
    dispatch(setUserEditFormValue(e.target.name, e.target.value));
  }




  return (
    <div className={`${styles.profile} pt-30`}>
      <div className={`${styles.profile__container}`}>
        <div className={`${styles.profile__menuContainer} mr-15`}>
          <ul className={`${styles.profile__menu} mb-20`}>
            <li className={styles.profile__link}>
              <a className={`${styles.profile__linkItem} text text_type_main-medium text_color_active`}>
                Профиль
              </a>
            </li>
            <li className={styles.profile__link}>
              <a className={`${styles.profile__linkItem} text text_type_main-medium text_color_inactive`}>
                История
              </a>
            </li>
            <li className={styles.profile__link}>
              <a onClick={() => {
                dispatch(signOut(getCookie('refreshToken')));
                history.replace({ pathname: '/login' });
              }} className={`${styles.profile__linkItem} text text_type_main-medium text_color_inactive`}>
                Выход
              </a>
            </li>
          </ul>
          <p className={`${styles.profile__caption} text text_type_main-default text_color_inactive`}>
            В этом разделе вы можете
            изменить свои персональные данные
          </p>
        </div>
        <div>
          <form>
            <div className={`${styles.profile__input} mb-6`}>
              <Input
                type={'text'}
                placeholder={'Имя'}
                value={currentUser.name}
                name={'name'}
                size={'default'}
                onChange={(e) => { onFormChange(e) }}
                ref={nameRef}
                icon={'EditIcon'}
                onIconClick={(e) => onIconClick(e, nameRef)}
                disabled={true}
              />
            </div>
            <div className={`${styles.profile__input} mb-6`}>
              <Input
                type={'email'}
                placeholder={'E-mail'}
                value={currentUser.email}
                name={'email'}
                size={'default'}
                ref={emailRef}
                onChange={(e) => { onFormChange(e) }}
                icon={'EditIcon'}
                onIconClick={(e) => onIconClick(e, emailRef)}
                disabled={true}
              />
            </div>
            <div className={`${styles.profile__input} mb-6`}>
              <Input
                type={'password'}
                placeholder={'Пароль'}
                value={password}
                name={'password'}
                size={'default'}
                onChange={(e) => { onFormChange(e) }}
                ref={passwordRef}
                icon={'EditIcon'}
                onIconClick={(e) => onIconClick(e, passwordRef)}
                disabled={true}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage