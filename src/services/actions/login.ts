// eslint-disable-next-line import/extensions
import { config } from '../../utils/data';
// eslint-disable-next-line import/extensions
import { checkResponse, deleteCookie, setCookie } from '../../utils/utils';
import { REMOVE_USER, SAVE_USER } from './user';

import { LOAD_USER_DATA } from './profileEdit';
import { AppDispatch, AppThunk } from '../../types';
import App from "../../components/app/app";

export const USER_LOGIN_FORM_SET_VALUE: 'USER_LOGIN_FORM_SET_VALUE' = 'USER_LOGIN_FORM_SET_VALUE';
export const USER_LOGIN_FORM_CHANGE_PASSWORD_VISION:'USER_LOGIN_FORM_CHANGE_PASSWORD_VISION' = 'USER_LOGIN_FORM_CHANGE_PASSWORD_VISION';
export const USER_LOGIN_REQUEST:'USER_LOGIN_REQUEST' = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS:'USER_LOGIN_SUCCESS' = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED:'USER_LOGIN_FAILED' = 'USER_LOGIN_FAILED';

export const USER_LOGOUT_REQUEST:'USER_LOGOUT_REQUEST' = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS:'USER_LOGOUT_SUCCESS' = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED:'USER_LOGOUT_FAILED' = 'USER_LOGOUT_FAILED';

export interface IUserLogoutFailed {
  type: typeof USER_LOGOUT_FAILED
}

export interface IUserLogoutSuccess {
  type: typeof USER_LOGOUT_SUCCESS
}

export interface IUserLogoutRequest {
  type: typeof USER_LOGOUT_REQUEST
}

export interface IUserLoginFailed {
  type: typeof USER_LOGIN_FAILED
}

export interface IUserLoginSuccess {
  type: typeof USER_LOGIN_SUCCESS
}

export interface IUserLoginRequest {
  type: typeof USER_LOGIN_REQUEST
}

export interface IUserLoginChangePasswordVision {
  type: typeof USER_LOGIN_FORM_CHANGE_PASSWORD_VISION
}

export interface ISetUserLoginFormValue {
  type: typeof USER_LOGIN_FORM_SET_VALUE;
  field: string;
  value: string
}

export const setUserLoginFormValue = (field: string, value: string): ISetUserLoginFormValue => ({
  type: USER_LOGIN_FORM_SET_VALUE,
  field,
  value,
});

export type TLogActions =
  | ISetUserLoginFormValue
  | IUserLoginChangePasswordVision
  | IUserLoginRequest
  | IUserLoginSuccess
  | IUserLoginFailed
  | IUserLogoutRequest
  | IUserLogoutSuccess
  | IUserLogoutFailed

// eslint-disable-next-line max-len
export const signIn: AppThunk = (email: string, password: string) => function (dispatch: AppDispatch) {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });
  fetch(`${config.baseUrl}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: config.headers,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(checkResponse)
    .then((res) => {
      dispatch({
        type: USER_LOGIN_SUCCESS,
      });
      dispatch({
        type: SAVE_USER,
        user: {
          email: res.user.email,
          name: res.user.name,
          password,
        },
      });
      dispatch({
        type: LOAD_USER_DATA,
        email: res.user.email,
        name: res.user.name,
        password,
        startedValues: {},
      });
      let accessToken;
      let refreshToken;
      // eslint-disable-next-line prefer-const,prefer-destructuring
      accessToken = res.accessToken.split('Bearer ')[1];
      // eslint-disable-next-line prefer-const
      refreshToken = res.refreshToken;

      if (accessToken) {
        setCookie('accessToken', accessToken, { expires: 1200 });
      }
      if (refreshToken) {
        setCookie('refreshToken', refreshToken, { expires: 86400 });
      }
    })
    .catch((error) => {
      dispatch({
        type: USER_LOGIN_FAILED,
      });
      console.log(error);
    });
};

export const signOut: AppThunk = (refreshToken: string, history: any) => function (dispatch: AppDispatch) {
  // eslint-disable-next-line func-names
    // console.log(refreshToken);
    dispatch({
      type: USER_LOGOUT_REQUEST,
    });
    fetch(`${config.baseUrl}/auth/logout`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: config.headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        token: refreshToken,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: USER_LOGOUT_SUCCESS,
          });
          dispatch({
            type: REMOVE_USER,
          });
          console.log(123);
          deleteCookie('refreshToken');
          deleteCookie('accessToken');
          history.replace({ pathname: '/login' });
        }
      })
      .catch((error) => {
        dispatch({
          type: USER_LOGOUT_FAILED,
        });
        console.log(error);
      });
  };
