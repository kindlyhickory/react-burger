import React, { useRef } from "react";
import styles from "./login.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { RESET_PASSWORD_CHANGE_PASSWORD_VISION, setPasswordForgotFormValue } from "../services/actions/resetPassword";

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const { password, code } = useSelector(store => store.resetPassword.form);
  const { isPasswordHide } = useSelector(store => store.resetPassword);

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

    dispatch({ type: RESET_PASSWORD_CHANGE_PASSWORD_VISION });
  }

  const onFormChange = (e) => {
    dispatch(setPasswordForgotFormValue(e.target.name, e.target.value));
  }


  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h2 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h2>
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
        <div className={`${styles.inputWrapper} mb-6`}>
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={e => onFormChange(e)}
            value={code}
            onIconClick={onIconClick}
            name={'code'}
            size={'default'}
          />
        </div>
        <Button type="primary" size="large">
          Сохранить
        </Button>
        <div className={`${styles.linkItem} mt-20 mb-4`}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <a className={styles.link} href="">Войти</a>
        </div>
      </form>
    </div>
  )
}

export default ResetPasswordPage;