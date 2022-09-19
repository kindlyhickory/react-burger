import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useEffect, useRef } from 'react';
// eslint-disable-next-line max-len
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  // eslint-disable-next-line max-len
  CHANGE_ABLE_OF_EDIT_EMAIL, CHANGE_ABLE_OF_EDIT_NAME, CHANGE_ABLE_OF_EDIT_PASSWORD, CHANGE_ABLE_OF_INPUTS, LOAD_USER_DATA, RESET_USER_DATA, setUserEditFormValue,
} from '../services/actions/profileEdit';
import styles from './profile.module.css';
import { updateUserData } from '../services/actions/user';
import ProfileMenu from '../components/profile-menu/profile-menu';

import OrderFeed from '../components/order-feed/order-feed';
import { useDispatch, useSelector } from '../hooks';

// eslint-disable-next-line react/function-component-definition
const ProfilePage:FC = () => {
  const dispatch = useDispatch();

  const { name, email, password } = useSelector((store) => store.editProfile['form']);
  const { isDisabled } = useSelector((store) => store.editProfile);

  // useEffect(() => {
  //   const token = getCookie('accessToken');
  //   // console.log(token);
  //   dispatch({type: WS_CONNECTION_START, payload: `wss://norma.nomoreparties.space/orders?token=${token}`});
  //   return () => {
  //     dispatch({type: WS_CONNECTION_CLOSE});
  //   }
  // }, [dispatch])

  // useEffect(() => {
  //   if (getCookie('refreshToken') && !getCookie('accessToken')) {
  //     dispatch(updateToken(getCookie('refreshToken')))
  //   }
  //   dispatch(getUser())
  // }, []);

  const currentUser = useSelector((store) => store.user.user);

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

  const { ref: passRef, ...passwordRest } = register('password', {
    onChange: (e) => onFormChange(e),
    required: 'Укажите пароль',
    minLength: {
      value: 4,
      message: 'Минимальная длина 4 символа',
    },
  });

  const { ref: namingRef, ...nameRest } = register('name', {
    onChange: (e) => onFormChange(e),
    required: 'Укажите имя',
    minLength: {
      value: 2,
      message: 'Некорректное имя. Минимальная длина 2',
    },

  });
  const { ref: mailRef, ...emailRest } = register('email', {
    onChange: (e) => onFormChange(e),
    required: 'Укажите email',
    pattern: {
      value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'Некорректный email адрес',
    },

  });

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const onIconClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, ref: React.RefObject<HTMLInputElement>) => {
    setTimeout(() => {
      ref.current!.focus();
    }, 0);
    // console.log(ref.current.getAttribute("name"));
    switch (ref.current!.getAttribute('name')) {
      case 'name':
        dispatch({ type: CHANGE_ABLE_OF_EDIT_NAME });
        break;
      case 'email':
        dispatch({ type: CHANGE_ABLE_OF_EDIT_EMAIL });
        break;
      case 'password':
        dispatch({ type: CHANGE_ABLE_OF_EDIT_PASSWORD });
        break;
      default:
        break;
    }
  };

  function onSubmit() {
    dispatch(updateUserData(name, email, password));
    dispatch({ type: CHANGE_ABLE_OF_INPUTS });
    // setIsDisable({ name: false, email: false, password: false });
  }

  const onFormChange = (e: { target: { name: string; value: string; }; }) => {
    dispatch(setUserEditFormValue(e.target.name, e.target.value));
  };

  useEffect(() => {
    dispatch({
      type: LOAD_USER_DATA, email: currentUser.email, name: currentUser.name, startedValues: { ...currentUser },
    });
  }, [dispatch]);

  const location = useLocation();

  return (

    <div className={`${styles.profile}`}>

      <div className={`${styles.profile__container}`}>
        <ProfileMenu />
        {location.pathname === '/profile' ? (
          <div className={`${styles.wrapper} pt-30  `}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={`${styles.profile__input} mb-6`}>
                {/*@ts-ignore*/}
                <Input
                  type="text"
                  placeholder="Имя"
                  value={name}
                  size="default"
                  icon={isDisabled['name'] ? 'EditIcon' : 'CloseIcon'}
                  {...nameRest}
                  ref={(e) => {
                    namingRef(e);
                    nameRef.current = e;
                  }}
                  onIconClick={(e) => onIconClick(e, nameRef)}
                  disabled={isDisabled['form']}
                  error={!!errors.name}
                />
              </div>
              <div className={`${styles.profile__input} mb-6`}>
                {/*@ts-ignore*/}
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  size="default"
                  icon={isDisabled['email'] ? 'EditIcon' : 'CloseIcon'}
                  onIconClick={(e) => onIconClick(e, emailRef)}
                  {...emailRest}
                  ref={(e) => {
                    mailRef(e);
                    emailRef.current = e;
                  }}
                  disabled={isDisabled['email']}
                  error={!!errors.email}
                />
              </div>
              <div className={`${styles.profile__input} mb-6`}>
                {/*@ts-ignore*/}
                <Input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  size="default"
                  icon={isDisabled['password'] ? 'EditIcon' : 'CloseIcon'}
                  onIconClick={(e) => onIconClick(e, passwordRef)}
                  {...passwordRest}
                  ref={(e) => {
                    passRef(e);
                    passwordRef.current = e;
                  }}
                  disabled={isDisabled['password']}
                  error={!!errors.password}
                />
              </div>
              <div className={`${styles.profile__buttonContainer}`}>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({ type: RESET_USER_DATA });
                  }}
                  type="secondary"
                  size="medium"
                >
                  Отмена
                </Button>
                <Button type="primary" size="medium">
                  Сохранить
                </Button>
              </div>
            </form>
          </div>
        )
          : <OrderFeed type="profile" />}
      </div>
    </div>
  );
};

export default ProfilePage;
