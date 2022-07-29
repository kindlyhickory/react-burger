import React, { useRef, useState } from "react";
import styles from './login.module.css'
import { makeRegistration, setUserRegistrationFormValue, USER_REGISTRATION_FORM_CHANGE_PASSWORD_VISION } from "../services/actions/registration";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";


function RegistrationPage() {
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "all" });

  const { name, email, password } = useSelector(store => store.registration.form);
  const { isPasswordHide } = useSelector(store => store.registration)

  const [isPasswordHiden, setPasswordHiden] = useState(true);
  const changePasswordVision = () => {
    setPasswordHiden(!isPasswordHiden)
  }
  const onFormChange = (e) => {
    dispatch(setUserRegistrationFormValue(e.target.name, e.target.value));
  }

  const history = useHistory();

  const onSubmit = () => {
    dispatch(makeRegistration(name, email, password, history))
  }

  return (
    <>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h2 className="text text_type_main-medium mb-6">
            Регистрация
          </h2>
          <div className={`${styles.inputWrapper} mb-6`}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              value={name}
              {...register('name', {
                onChange: e => onFormChange(e),
                required: 'Укажите имя',
                minLength: {
                  value: 2,
                  message: "Некорректное имя. Минимальная длина 2"
                }

              })}
              error={errors.name ? true : false}
              errorText={errors.name?.message}
              size={'default'}
            />
          </div>
          <div className={`${styles.inputWrapper} mb-6`}>
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={e => onFormChange(e)}
              value={email}
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
              onChange={e => onFormChange(e)}
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
            Зарегистрироваться
          </Button>
          <div className={`${styles.linkItem} mt-20`}>
            <p className="text text_type_main-default text_color_inactive">
              Уже зарегистрированы?
            </p>
            <Link className={styles.link} to="/login">Войти</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default RegistrationPage;