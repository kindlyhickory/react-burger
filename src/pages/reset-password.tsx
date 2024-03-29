import React, { FC, useRef, useState } from "react";
import styles from "./login.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { RESET_PASSWORD_CHANGE_PASSWORD_VISION, setPasswordForgotFormValue } from "../services/actions/resetPassword";
import { resetPassword } from "../services/actions/user";
import { useHistory, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "../hooks";

// eslint-disable-next-line react/function-component-definition
const ResetPasswordPage:FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
  const { password, code } = useSelector((store) => store.resetPassword['form']);
  const { isPasswordHide } = useSelector(store => store.resetPassword);
  const history = useHistory();
  const [isPasswordHiden, setPasswordHiden] = useState(true);


  const passwordRef = useRef(null);

  const changePasswordVision = () => {
    setPasswordHiden(!isPasswordHiden);
  }

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPasswordForgotFormValue(e.target.name, e.target.value));
  }

  function onSubmit() {
    dispatch(resetPassword(password, code, history));
  }

  // @ts-ignore
  // @ts-ignore
  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h2>
        <div className={`${styles.inputWrapper} mb-6`}>
          {/*@ts-ignore*/}
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
            size={'default'}
            error={errors.password ? true : false}
          />
        </div>
        <div className={`${styles.inputWrapper} mb-6`}>
          {/*@ts-ignore*/}
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={e => onFormChange(e)}
            value={code}
            name={'code'}
            size={'default'}
          />
        </div>
        <Button type="primary" size="large">
          Сбросить пароль
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

export default ResetPasswordPage;