import React from "react";
import styles from "./login.module.css";
import { setUserForgotFormValue } from "../services/actions/forgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { sendForgotPasswordCode } from "../services/actions/user";
import { useHistory, Link } from 'react-router-dom';

function ForgotPasswordPage() {
  const dispatch = useDispatch()
  const history = useHistory();

  const { email } = useSelector(store => store.forgotPassword.form);


  const onFormChange = (e) => {
    dispatch(setUserForgotFormValue(e.target.name, e.target.value));
  }
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
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
            size={'default'}
          />
        </div>
        <Button onClick={(e) => {
          e.preventDefault()
          dispatch(sendForgotPasswordCode(email, history));
        }} type="primary" size="large">
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
  )
}

export default ForgotPasswordPage;