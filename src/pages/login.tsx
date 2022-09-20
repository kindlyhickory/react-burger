import React, { ChangeEvent, useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Redirect, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { setUserLoginFormValue, signIn } from '../services/actions/login';
import styles from './login.module.css';
import { useDispatch, useSelector } from '../hooks';

function LoginPage() {
  const dispatch = useDispatch();
  const { email, password } = useSelector((store) => store.login.form);
  const [isPasswordHiden, setPasswordHiden] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

  const user = useSelector((store) => store.user.user);
  const changePasswordVision = () => {
    setPasswordHiden(!isPasswordHiden);
  };

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserLoginFormValue(e.target.name, e.target.value));
  };

  function onSubmit() {
    dispatch(signIn(email, password));
  }

  if (user.email !== '' && user.name !== '') {
    return (
      <Redirect to="/" />
    );
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className="text text_type_main-medium mb-6">
          Вход
        </h2>
        <div className={`${styles.inputWrapper} mb-6`}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Input
            type="email"
            placeholder="E-mail"
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...register('email', {
              onChange: (e) => onFormChange(e),
              required: 'Укажите email',
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Некорректный email адрес',
              },

            })}
            value={email}
            name="email"
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            error={!!errors.email}
            size="default"
          />
        </div>
        <div className={`${styles.inputWrapper} mb-6`}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Input
            type={isPasswordHiden ? 'password' : 'text'}
            placeholder="Пароль"
            value={password}
            onIconClick={changePasswordVision}
            icon={isPasswordHiden ? 'ShowIcon' : 'HideIcon'}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...register('password', {
              onChange: (e) => onFormChange(e),
              required: 'Укажите пароль',
              minLength: {
                value: 4,
                message: 'Минимальная длина 4 символа',
              },
            })}
            error={!!errors.password}
            size="default"
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
  );
}

export default LoginPage;

export {};
