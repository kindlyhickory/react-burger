import React, { useRef } from "react";
import styles from './login.module.css'
import { makeRegistration, setUserRegistrationFormValue, USER_REGISTRATION_FORM_CHANGE_PASSWORD_VISION } from "../services/actions/registration";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";


function RegistrationPage() {
  const passwordRef = useRef(null);
  const dispatch = useDispatch();

  const { name, email, password } = useSelector(store => store.registration.form);
  const { isPasswordHide } = useSelector(store => store.registration)

  const onIconClick = () => {
    setTimeout(() => {
      passwordRef.current.focus()
    }, 0)

    if (passwordRef.current.getAttribute('type') === 'password') {
      passwordRef.current.setAttribute('type', 'undefined');
    } else {
      passwordRef.current.setAttribute('type', 'password');
    }

    dispatch({ type: USER_REGISTRATION_FORM_CHANGE_PASSWORD_VISION });
  }

  const onFormChange = (e) => {
    dispatch(setUserRegistrationFormValue(e.target.name, e.target.value));
  }

  return (
    <>
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <h2 className="text text_type_main-medium mb-6">
            Регистрация
          </h2>
          <div className={`${styles.inputWrapper} mb-6`}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={e => onFormChange(e)}
              value={name}
              name={'name'}
              size={'default'}
            />
          </div>
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
            dispatch(makeRegistration(name, email, password))
          }} type="primary" size="large">
            Зарегистрироваться
          </Button>
          <div className={`${styles.linkItem} mt-20`}>
            <p className="text text_type_main-default text_color_inactive">
              Уже зарегистрированы?
            </p>
            <a className={styles.link} href="">Войти</a>
          </div>
        </form>
      </div>
    </>
  )
}

export default RegistrationPage;