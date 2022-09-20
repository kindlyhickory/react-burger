import { config } from '../../utils/data';
import { checkResponse, setCookie, getCookie } from '../../utils/utils';

import {
  AppDispatch, AppThunk, TUser, TUserLog,
} from '../../types';

export const GET_USER_REQUEST = 'GET_USER_REQUEST' as const;
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS' as const;
export const GET_USER_FAILED = 'GET_USER_FAILED' as const;
export const UPDATE_USER = 'UPDATE_USER' as const;
export const CHANGE_USER_LOAD = 'CHANGE_USER_LOAD' as const;
export const REMOVE_USER = 'REMOVE_USER' as const;
export const AUTH_CHECKED = 'AUTH_CHECKED' as const;

export const SEND_FORGOT_PASSWORD_CODE_REQUEST = 'SEND_FORGOT_PASSWORD_CODE_REQUEST' as const;
export const SEND_FORGOT_PASSWORD_CODE_FAILED = 'SEND_FORGOT_PASSWORD_CODE_FAILED' as const;
export const SEND_FORGOT_PASSWORD_CODE_SUCCESS = 'SEND_FORGOT_PASSWORD_CODE_SUCCESS' as const;

export const SEND_RESET_PASSWORD_REQUEST = 'SEND_RESET_PASSWORD_REQUEST' as const;
export const SEND_RESET_PASSWORD_FAILED = 'SEND_RESET_PASSWORD_FAILED' as const;
export const SEND_RESET_PASSWORD_SUCCESS = 'SEND_RESET_PASSWORD_SUCCESS' as const;

export const CHANGE_STATUS_SENDING_FORGOT_PASSWORD_MESSAGE = 'CHANGE_STATUS_SENDING_FORGOT_PASSWORD_MESSAGE' as const;

export const UPDATE_USER_ACCESS_TOKEN = 'UPDATE_USER_ACCESS_TOKEN' as const;
export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST' as const;
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS' as const;
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED' as const;

export const UPDATE_USER_DATA_REQUEST = 'UPDATE_USER_DATA_REQUEST' as const;
export const UPDATE_USER_DATA_FAILED = 'UPDATE_USER_DATA_FAILED' as const;
export const UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS' as const;

export const SET_USER_LOADED = 'SET_USER_LOADED' as const;

export const SAVE_USER = 'SAVE_USER' as const;

export interface IGetUserRequest {
  type: typeof GET_USER_REQUEST
}

export interface IGetUserSuccess {
  type: typeof GET_USER_SUCCESS
}

export interface IGetUserFailed {
  type: typeof GET_USER_FAILED
}

export interface IUpdateUser {
  type: typeof UPDATE_USER
}

export interface IChangeUserLoad {
  type: typeof CHANGE_USER_LOAD
}

export interface IRemoveUser {
  type: typeof REMOVE_USER
}

export interface IAuthChecked {
  type: typeof AUTH_CHECKED
}

export interface ISendForgotPasswordCodeRequest {
  type: typeof SEND_FORGOT_PASSWORD_CODE_REQUEST
}

export interface ISendForgotPasswordCodeFailed {
  type: typeof SEND_FORGOT_PASSWORD_CODE_FAILED
}

export interface ISendForgotPasswordCodeSuccess {
  type: typeof SEND_FORGOT_PASSWORD_CODE_SUCCESS
}

export interface ISetResetPasswordRequest {
  type: typeof SEND_RESET_PASSWORD_REQUEST
}

export interface ISetResetPasswordFailed {
  type: typeof SEND_RESET_PASSWORD_FAILED
}

export interface ISetResetPasswordSuccess {
  type: typeof SEND_RESET_PASSWORD_SUCCESS
}

export interface IChangeStatusSendingForgotPasswordMessage {
  type: typeof CHANGE_STATUS_SENDING_FORGOT_PASSWORD_MESSAGE
}

export interface IUpdateAccessToken {
  type: typeof UPDATE_USER_ACCESS_TOKEN
}

export interface IUpdateTokenRequest {
  type: typeof UPDATE_TOKEN_REQUEST
}

export interface IUpdateTokenSuccess {
  type: typeof UPDATE_TOKEN_SUCCESS
}

export interface IUpdateTokenFailed {
  type: typeof UPDATE_TOKEN_FAILED
}

export interface IUpdateUserDataRequest {
  type: typeof UPDATE_USER_DATA_REQUEST
}

export interface IUpdateUserDataFailed {
  type: typeof UPDATE_USER_DATA_FAILED
}

export interface IUpdateUserDataSuccess {
  type: typeof UPDATE_USER_DATA_SUCCESS;
  email: string;
  name: string;
}

export interface ISetUserLoaded {
  type: typeof SET_USER_LOADED
}

export interface ISaveUser {
  type: typeof SAVE_USER;
  user: {
    email: string;
    name: string;
    password: string;

  }
}

export type TUserActions =
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFailed
  | IUpdateUser
  | IChangeUserLoad
  | IRemoveUser
  | IAuthChecked
  | ISendForgotPasswordCodeRequest
  | ISendForgotPasswordCodeFailed
  | ISendForgotPasswordCodeSuccess
  | ISetResetPasswordFailed
  | ISetResetPasswordSuccess
  | IChangeStatusSendingForgotPasswordMessage
  | IUpdateTokenRequest
  | IUpdateTokenSuccess
  | IUpdateTokenFailed
  | IUpdateUserDataFailed
  | IUpdateUserDataSuccess
  | ISetUserLoaded
  | ISaveUser
  | ISetResetPasswordRequest
  | IUpdateAccessToken
  | IUpdateUserDataRequest

// eslint-disable-next-line max-len
export const updateUserData: AppThunk = (name: string, email: string, password: string) => function (dispatch: AppDispatch) {
  dispatch({ type: UPDATE_USER_DATA_REQUEST });
  fetch(`${config.baseUrl}/auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      ...config.headers,
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })
    .then((res) => checkResponse<TUser>(res))
    .then((res) => {
      dispatch({ type: UPDATE_USER_DATA_SUCCESS, name: res.user.name, email: res.user.email });
    })
    .catch((error) => {
      dispatch({ type: UPDATE_TOKEN_FAILED });
      console.log(error);
    });
};

export const resetPassword:AppThunk = (password: string, code: string, history: any) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: SEND_RESET_PASSWORD_REQUEST });
    fetch(`${config.baseUrl}/password-reset/reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: config.headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        password,
        token: code,
      }),
    })
      .then((res) => checkResponse<TUserLog>(res))
      .then((res) => {
        dispatch({ type: SEND_RESET_PASSWORD_SUCCESS });
        dispatch({ type: CHANGE_STATUS_SENDING_FORGOT_PASSWORD_MESSAGE });
        if (res.success) {
          history.replace({ pathname: '/login' });
        }
      })
      .catch((error) => {
        dispatch({ type: SEND_RESET_PASSWORD_FAILED });
        console.log(error);
      });
  };
}

export function sendForgotPasswordCode(email: string, history: any) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: SEND_FORGOT_PASSWORD_CODE_REQUEST });
    fetch(`${config.baseUrl}/password-reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: config.headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => checkResponse<TUserLog>(res))
      .then((res) => {
        dispatch({ type: SEND_FORGOT_PASSWORD_CODE_SUCCESS });
        dispatch({ type: CHANGE_STATUS_SENDING_FORGOT_PASSWORD_MESSAGE });
        if (res.success) {
          history.replace({ pathname: '/reset-password' });
        }
      })
      .catch((error) => {
        dispatch({ type: SEND_FORGOT_PASSWORD_CODE_FAILED });
        console.log(error);
      });
  };
}

export function updateToken(refreshToken: string | undefined) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: UPDATE_TOKEN_REQUEST });
    fetch(`${config.baseUrl}/auth/token`, {
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
      .then((res) => checkResponse<TUser>(res))
      .then((res) => {
        dispatch({ type: UPDATE_TOKEN_SUCCESS });
        setCookie('accessToken', res.accessToken.split('Bearer ')[1], { expires: 1200 });
        setCookie('refreshToken', res.refreshToken, { expires: 1200 });
      })
      .catch((error) => {
        dispatch({ type: UPDATE_TOKEN_FAILED });
        console.log(error);
      });
  };
}

export function getUser() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    fetch(`${config.baseUrl}/auth/user`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        ...config.headers,
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
      .then((res) => checkResponse<TUser>(res))
      .then((res) => {
        dispatch({
          type: SAVE_USER,
          user: {
            email: res.user.email,
            name: res.user.name,
            password: ''
          },
        });
        dispatch({
          type: GET_USER_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_USER_FAILED,
        });
        console.log(error);
      })
      .finally(() => {
        dispatch({ type: AUTH_CHECKED });
      });
  };
}
