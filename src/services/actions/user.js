import { config } from "../../utils/data";
import { checkResponse, setCookie } from "../../utils/utils";

import { getCookie } from "../../utils/utils";

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const UPDATE_USER = 'UPDATE_USER';
export const CHANGE_USER_LOAD = 'CHANGE_USER_LOAD';
export const REMOVE_USER = 'REMOVE_USER';
export const CHANGE_USER_VISIT_FORGOT_PASSWORD_PAGE = 'CHANGE_USER_VISIT_FORGOT_PASSWORD_PAGE';
export const UPDATE_USER_ACCESS_TOKE = 'UPDATE_USER_ACCESS_TOKEN';
export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';


export const SAVE_USER = 'SAVE_USER';

export function updateToken(refreshToken) {
  return function (dispatch) {
    console.log(refreshToken)
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


export function getUser() {
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
      });

  }
}