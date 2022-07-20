import React, { useRef } from "react";
import styles from "./login.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoginFormValue, signIn, USER_LOGIN_FORM_CHANGE_PASSWORD_VISION } from "../services/actions/login";

function LoginPage() {
  const dispatch = useDispatch();
  const { email, password } = useSelector(store => store.login.form);
  const { isPasswordHide } = useSelector(store => store.login);

  const passwordRef = useRef(null);

  const onIconClick = () => {
    setTimeout(() => {
      passwordRef.current.focus()
    }, 0)

    if (passwordRef.current.getAttribute('type') === 'password') {
      passwordRef.current.setAttribute('type', 'undefined');
    } else {
      passwordRef.current.setAttribute('type', 'password');
    }

    dispatch({ type: USER_LOGIN_FORM_CHANGE_PASSWORD_VISION });
  }

  const onFormChange = (e) => {
    dispatch(setUserLoginFormValue(e.target.name, e.target.value));
  }


  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h2 className="text text_type_main-medium mb-6">
          Вход
        </h2>
        <div className={`${styles.inputWrapper} mb-6`}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={e => onFormChange(e)}
            value={email}
            name={'email'}
            size={'default'}
          />
        </div>
        <div className={`${styles.inputWrapper} mb-6`}>
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={e => onFormChange(e)}
            value={password}
            onIconClick={onIconClick}
            icon={isPasswordHide ? 'ShowIcon' : 'HideIcon'}
            name={'password'}
            ref={passwordRef}
            size={'default'}
          />
        </div>
        <Button onClick={(e) => {
          e.preventDefault();
          dispatch(signIn(email, password));
        }} type="primary" size="large">
          Войти
        </Button>
        <div className={`${styles.linkItem} mt-20 mb-4`}>
          <p className="text text_type_main-default text_color_inactive">
            Вы новый пользователь?
          </p>
          <a className={styles.link} href="">Зарегистрироваться</a>
        </div>
        <div className={`${styles.linkItem}`}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <a className={styles.link} href="">Восстановить пароль</a>
        </div>
      </form>
    </div>
  )
}

export default LoginPage;