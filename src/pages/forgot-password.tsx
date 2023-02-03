import React, { FC } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { sendForgotPasswordCode } from '../services/actions/user';
import { setUserForgotFormValue } from '../services/actions/forgotPassword';
import styles from './login.module.css';
import { useDispatch, useSelector } from '../hooks';

// eslint-disable-next-line react/function-component-definition
const ForgotPasswordPage:FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
  const { email } = useSelector((store) => store.forgotPassword.form);

  function onSubmit() {
    dispatch(sendForgotPasswordCode(email, history));
  }

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserForgotFormValue(e.target.name, e.target.value));
  };
  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h2>
        <div className={`${styles.inputWrapper} mb-6`}>
          {/* Делаю ts-ignore на каждый инпут из библиотеки Яндекса, потому что прокидывая,
           в инпут дополнительные поля, которые идут от register, ts ругается, что эти пропсы
            не типизированы как нужно. А я не могу типизировать библиотеку Яндекса,
             чтобы это всё заработало
            */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Input
            type="email"
            placeholder="Укажите e-mail"
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
        <Button type="primary" size="large">
          Отправить код
        </Button>
        <div className={`${styles.linkItem} mt-20 mb-4`}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link className={styles.link} to="/login">Войти</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
