import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_ABLE_OF_EDIT_EMAIL, CHANGE_ABLE_OF_EDIT_NAME, CHANGE_ABLE_OF_EDIT_PASSWORD, CHANGE_ABLE_OF_INPUTS, LOAD_USER_DATA, RESET_USER_DATA, setUserEditFormValue, USER_EDIT_FORM_CHANGE_PASSWORD_VISION } from '../services/actions/profileEdit';
import { getCookie } from '../utils/utils';
import styles from './profile.module.css';
import { useHistory } from 'react-router-dom';
import { signOut } from "../services/actions/login"
import { getUser, updateUserData } from '../services/actions/user';


function ProfilePage() {

  const dispatch = useDispatch();
  const history = useHistory();

  const { name, email, password } = useSelector(store => store.editProfile.form);
  console.log(name, email, password)
  const { isPasswordHide, isDisabled } = useSelector(store => store.editProfile);




  // useEffect(() => {
  //   if (getCookie('refreshToken') && !getCookie('accessToken')) {
  //     dispatch(updateToken(getCookie('refreshToken')))
  //   }
  //   dispatch(getUser())
  // }, []);

  const currentUser = useSelector(store => store.user.user);


  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const onIconClick = (e, ref) => {
    setTimeout(() => {
      ref.current.focus()
    }, 0)
    console.log(ref.current.getAttribute("name"));
    switch (ref.current.getAttribute("name")) {
      case 'name':
        dispatch({ type: CHANGE_ABLE_OF_EDIT_NAME });
        break;
      case 'email':
        dispatch({ type: CHANGE_ABLE_OF_EDIT_EMAIL });
        break;
      case 'password':
        dispatch({ type: CHANGE_ABLE_OF_EDIT_PASSWORD });
        break;
      default:
        break;
    }

  }

  const onFormChange = (e) => {
    dispatch(setUserEditFormValue(e.target.name, e.target.value));
  }

  useEffect(() => {
    dispatch({ type: LOAD_USER_DATA, email: currentUser.email, name: currentUser.name, startedValues: { ...currentUser } });
  }, [dispatch])




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
                dispatch(signOut(getCookie('refreshToken'), history));
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
                value={name}
                name={'name'}
                size={'default'}
                onChange={(e) => { onFormChange(e) }}
                ref={nameRef}
                icon={isDisabled.name ? 'EditIcon' : "CloseIcon"}
                onIconClick={(e) => onIconClick(e, nameRef)}
                disabled={isDisabled.name}
              />
            </div>
            <div className={`${styles.profile__input} mb-6`}>
              <Input
                type={'email'}
                placeholder={'E-mail'}
                value={email}
                name={'email'}
                size={'default'}
                ref={emailRef}
                onChange={(e) => { onFormChange(e) }}
                icon={isDisabled.email ? 'EditIcon' : "CloseIcon"}
                onIconClick={(e) => onIconClick(e, emailRef)}
                disabled={isDisabled.email}
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
                icon={isDisabled.password ? 'EditIcon' : 'CloseIcon'}
                onIconClick={(e) => onIconClick(e, passwordRef)}
                disabled={isDisabled.password}
              />
            </div>
            <div className={`${styles.profile__buttonContainer}`}>
              <Button onClick={(e) => {
                e.preventDefault();
                dispatch({ type: RESET_USER_DATA })
              }} type="secondary" size="medium">
                Отмена
              </Button>
              <Button onClick={(e) => {
                e.preventDefault();
                dispatch(updateUserData(name, email, password));
                dispatch({ type: CHANGE_ABLE_OF_INPUTS });
              }} type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage