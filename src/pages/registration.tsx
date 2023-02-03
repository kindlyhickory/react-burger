import React, { FC, useState } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { makeRegistration, setUserRegistrationFormValue } from '../services/actions/registration';
import styles from './login.module.css';
import { useDispatch, useSelector } from '../hooks';

// eslint-disable-next-line react/function-component-definition
const RegistrationPage:FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'all' });

  const { name, email, password } = useSelector((store) => store.registration.form);

  const [isPasswordHiden, setPasswordHiden] = useState(true);
  const changePasswordVision = () => {
    setPasswordHiden(!isPasswordHiden);
  };
  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserRegistrationFormValue(e.target.name, e.target.value));
  };

  const history = useHistory();

  const onSubmit = () => {
    dispatch(makeRegistration(name, email, password, history));
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className="text text_type_main-medium mb-6">
          Регистрация
        </h2>
        <div className={`${styles.inputWrapper} mb-6`}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Input
            type="text"
            placeholder="Имя"
            value={name}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...register('name', {
              onChange: (e) => onFormChange(e),
              required: 'Укажите имя',
              minLength: {
                value: 2,
                message: 'Некорректное имя. Минимальная длина 2',
              },

            })}
            error={!!errors.name}
            size="default"
          />
        </div>
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
  );
};

export default RegistrationPage;
