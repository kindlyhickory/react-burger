import React, { useState } from "react";
import styles from "./login.module.css";
import { setUserForgotFormValue } from "../services/actions/forgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { sendForgotPasswordCode } from "../services/actions/user";
import { useHistory, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

function ForgotPasswordPage() {
  const dispatch = useDispatch()
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
  const { email } = useSelector(store => store.forgotPassword.form);

  function onSubmit() {
    dispatch(sendForgotPasswordCode(email, history));
  }

  const onFormChange = (e) => {
    dispatch(setUserForgotFormValue(e.target.name, e.target.value));
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h2>
        <div className={`${styles.inputWrapper} mb-6`}>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={e => onFormChange(e)}
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
    </div >
  )
}

export default ForgotPasswordPage;