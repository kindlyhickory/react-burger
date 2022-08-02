import React, { useRef, useState } from "react";
import styles from "./login.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoginFormValue, signIn, USER_LOGIN_FORM_CHANGE_PASSWORD_VISION } from "../services/actions/login";
import { useHistory, Redirect, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { observe } from "react-intersection-observer";


function LoginPage() {
  const dispatch = useDispatch();
  const { email, password } = useSelector(store => store.login.form);
  const [isPasswordHiden, setPasswordHiden] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });

  const user = useSelector(store => store.user.user);

  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  const changePasswordVision = () => {
    setPasswordHiden(!isPasswordHiden);
  }

  const onFormChange = (e) => {
    dispatch(setUserLoginFormValue(e.target.name, e.target.value));
  }

  function onSubmit() {
    dispatch(signIn(email, password));
  }

  if (user.email !== '' && user.name !== '') {
    return (
      <Redirect to={state?.from || '/'}></Redirect>
    )
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className="text text_type_main-medium mb-6">
          Вход
        </h2>
        <div className={`${styles.inputWrapper} mb-6`}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            value={email}
            name={'email'}
            {...register('email', {
              onChange: e => onFormChange(e),
              required: 'Укажите email',
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Некорректный email адрес"
              }

            })}
            error={errors.email ? true : false}
            errorText={errors.email?.message}
            size={'default'}
          />
        </div>
        <div className={`${styles.inputWrapper} mb-6`}>
          <Input
            type={isPasswordHiden ? 'password' : 'text'}
            placeholder={'Пароль'}
            value={password}
            onIconClick={changePasswordVision}
            icon={isPasswordHiden ? 'ShowIcon' : 'HideIcon'}
            {...register('password', {
              onChange: e => onFormChange(e),
              required: 'Укажите пароль',
              minLength: {
                value: 4,
                message: 'Минимальная длина 4 символа'
              }
            })}
            errorText={errors.password && errors.password.message}
            error={errors.password ? true : false}
            size={'default'}
          />
        </div>
        <Button type="primary" size="large">
          Войти
        </Button>
        <div className={`${styles.linkItem} mt-20 mb-4`}>
          <p className="text text_type_main-default text_color_inactive">
            Вы новый пользователь?
          </p>
          <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
        </div>
        <div className={`${styles.linkItem}`}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage;