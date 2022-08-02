import { func } from "prop-types";
import { config } from "../../utils/data";
import { checkResponse, setCookie } from "../../utils/utils";

import { getCookie } from "../../utils/utils";

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const UPDATE_USER = 'UPDATE_USER';
export const CHANGE_USER_LOAD = 'CHANGE_USER_LOAD';
export const REMOVE_USER = 'REMOVE_USER';
export const AUTH_CHECKED = 'AUTH_CHECKED';

export const SEND_FORGOT_PASSWORD_CODE_REQUEST = 'SEND_FORGOT_PASSWORD_CODE_REQUEST';
export const SEND_FORGOT_PASSWORD_CODE_FAILED = 'SEND_FORGOT_PASSWORD_CODE_FAILED';
export const SEND_FORGOT_PASSWORD_CODE_SUCCESS = 'SEND_FORGOT_PASSWORD_CODE_SUCCESS';

export const SEND_RESET_PASSWORD_REQUEST = 'SEND_RESET_PASSWORD_REQUEST';
export const SEND_RESET_PASSWORD_FAILED = 'SEND_RESET_PASSWORD_FAILED';
export const SEND_RESET_PASSWORD_SUCCESS = 'SEND_RESET_PASSWORD_SUCCESS';

export const CHANGE_STATUS_SENDING_FORGOT_PASSWORD_MESSAGE = 'CHANGE_STATUS_SENDING_FORGOT_PASSWORD_MESSAGE';

export const UPDATE_USER_ACCESS_TOKE = 'UPDATE_USER_ACCESS_TOKEN';
export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';

export const UPDATE_USER_DATA_REQUEST = 'UPDATE_USER_DATA_REQUEST';
export const UPDATE_USER_DATA_FAILED = 'UPDATE_USER_DATA_FAILED';
export const UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS';

export const SET_USER_LOADED = 'SET_USER_LOADED';

export const SAVE_USER = 'SAVE_USER';

export function updateUserData(name, email, password) {
  return function (dispatch) {
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

export function resetPassword(password, code, history) {
  return function (dispatch) {
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

export function sendForgotPasswordCode(email, history) {
  return function (dispatch) {
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

export function updateToken(refreshToken) {
  return function (dispatch) {
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


export function getUser(password) {
  return function (dispatch) {
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