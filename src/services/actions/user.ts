import { func } from "prop-types";
import { config } from "../../utils/data";
import { checkResponse, setCookie } from "../../utils/utils";

import { getCookie } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../../types";

export const GET_USER_REQUEST:'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS:'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED:'GET_USER_FAILED' = 'GET_USER_FAILED';
export const UPDATE_USER:'UPDATE_USER' = 'UPDATE_USER';
export const CHANGE_USER_LOAD:'CHANGE_USER_LOAD' = 'CHANGE_USER_LOAD';
export const REMOVE_USER:'REMOVE_USER' = 'REMOVE_USER';
export const AUTH_CHECKED:'AUTH_CHECKED' = 'AUTH_CHECKED';

export const SEND_FORGOT_PASSWORD_CODE_REQUEST:'SEND_FORGOT_PASSWORD_CODE_REQUEST' = 'SEND_FORGOT_PASSWORD_CODE_REQUEST';
export const SEND_FORGOT_PASSWORD_CODE_FAILED:'SEND_FORGOT_PASSWORD_CODE_FAILED' = 'SEND_FORGOT_PASSWORD_CODE_FAILED';
export const SEND_FORGOT_PASSWORD_CODE_SUCCESS:'SEND_FORGOT_PASSWORD_CODE_SUCCESS' = 'SEND_FORGOT_PASSWORD_CODE_SUCCESS';

export const SEND_RESET_PASSWORD_REQUEST:'SEND_RESET_PASSWORD_REQUEST' = 'SEND_RESET_PASSWORD_REQUEST';
export const SEND_RESET_PASSWORD_FAILED:'SEND_RESET_PASSWORD_FAILED' = 'SEND_RESET_PASSWORD_FAILED';
export const SEND_RESET_PASSWORD_SUCCESS:'SEND_RESET_PASSWORD_SUCCESS' = 'SEND_RESET_PASSWORD_SUCCESS';

export const CHANGE_STATUS_SENDING_FORGOT_PASSWORD_MESSAGE:'CHANGE_STATUS_SENDING_FORGOT_PASSWORD_MESSAGE' = 'CHANGE_STATUS_SENDING_FORGOT_PASSWORD_MESSAGE';

export const UPDATE_USER_ACCESS_TOKEN:'UPDATE_USER_ACCESS_TOKEN' = 'UPDATE_USER_ACCESS_TOKEN';
export const UPDATE_TOKEN_REQUEST:'UPDATE_TOKEN_REQUEST' = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS:'UPDATE_TOKEN_SUCCESS' = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED:'UPDATE_TOKEN_FAILED' = 'UPDATE_TOKEN_FAILED';

export const UPDATE_USER_DATA_REQUEST:'UPDATE_USER_DATA_REQUEST' = 'UPDATE_USER_DATA_REQUEST';
export const UPDATE_USER_DATA_FAILED:'UPDATE_USER_DATA_FAILED' = 'UPDATE_USER_DATA_FAILED';
export const UPDATE_USER_DATA_SUCCESS:'UPDATE_USER_DATA_SUCCESS' = 'UPDATE_USER_DATA_SUCCESS';

export const SET_USER_LOADED:'SET_USER_LOADED' = 'SET_USER_LOADED';

export const SAVE_USER:'SAVE_USER' = 'SAVE_USER';

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

export const updateUserData: AppThunk =(name: string, email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: UPDATE_USER_DATA_REQUEST })
    fetch(`${config.baseUrl}/auth/user`, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        ...config.headers,
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      })
    })
      .then(checkResponse)
      .then(res => {
        dispatch({ type: UPDATE_USER_DATA_SUCCESS, name: res.user.name, email: res.user.email });
      })
      .catch(error => {
        dispatch({ type: UPDATE_TOKEN_FAILED });
        console.log(error);
      })

  }
}

export function resetPassword(password: string, code: string, history: any) {
  return function (dispatch: any) {
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
        password: password,
        token: code,
      })
    })
      .then(checkResponse)
      .then(res => {
        dispatch({ type: SEND_RESET_PASSWORD_SUCCESS });
        dispatch({ type: CHANGE_STATUS_SENDING_FORGOT_PASSWORD_MESSAGE });
        if (res.success) {
          history.replace({ pathname: '/login' });
        }
      })
      .catch(error => {
        dispatch({ type: SEND_RESET_PASSWORD_FAILED });
        console.log(error);
      })
  }

}

export function sendForgotPasswordCode(email: string, history: any) {
  return function (dispatch: any) {
    dispatch({ type: SEND_FORGOT_PASSWORD_CODE_REQUEST })
    fetch(`${config.baseUrl}/password-reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: config.headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        email: email
      })
    }
    )
      .then(checkResponse)
      .then(res => {
        dispatch({ type: SEND_FORGOT_PASSWORD_CODE_SUCCESS });
        dispatch({ type: CHANGE_STATUS_SENDING_FORGOT_PASSWORD_MESSAGE })
        if (res.success) {
          history.replace({ pathname: '/reset-password' })
        }
      })
      .catch(error => {
        dispatch({ type: SEND_FORGOT_PASSWORD_CODE_FAILED });
        console.log(error);
      })
  }
}

export function updateToken(refreshToken:string) {
  return function (dispatch: any) {
    dispatch({ type: UPDATE_TOKEN_REQUEST })
    fetch(`${config.baseUrl}/auth/token`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: config.headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        token: refreshToken
      })
    })
      .then(checkResponse)
      .then(res => {
        dispatch({ type: UPDATE_TOKEN_SUCCESS })
        setCookie('accessToken', res.accessToken.split('Bearer ')[1], { expires: 1200 });
        setCookie('refreshToken', res.refreshToken, { expires: 1200 });
      })
      .catch(error => {
        dispatch({ type: UPDATE_TOKEN_FAILED })
        console.log(error);
      })
  }
}


export function getUser(password: string) {
  return function (dispatch: any) {
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
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
      .then(checkResponse)
      .then(res => {
        dispatch({
          type: SAVE_USER,
          user: {
            email: res.user.email,
            name: res.user.name,
          }
        })
        dispatch({
          type: GET_USER_SUCCESS
        })

      })
      .catch(error => {
        dispatch({
          type: GET_USER_FAILED,
        });
        console.log(error);
      })
      .finally(()=> {
        dispatch({type: AUTH_CHECKED});
      });

  }
}