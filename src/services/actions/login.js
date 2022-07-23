import { bindActionCreators } from "redux";
import { config } from "../../utils/data";
import { checkResponse, deleteCookie } from "../../utils/utils";
import { REMOVE_USER, SAVE_USER } from "./user";
import { setCookie } from "../../utils/utils";
import { LOAD_USER_DATA } from "./profileEdit";

export const USER_LOGIN_FORM_SET_VALUE = 'USER_LOGIN_FORM_SET_VALUE';
export const USER_LOGIN_FORM_CHANGE_PASSWORD_VISION = 'USER_LOGIN_FORM_CHANGE_PASSWORD_VISION';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';


export const setUserLoginFormValue = (field, value) => ({
  type: USER_LOGIN_FORM_SET_VALUE,
  field,
  value
})

export function signIn(email, password) {
  return function (dispatch) {
    dispatch({
      type: USER_LOGIN_REQUEST
    })
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
        password
      })
    })
      .then(checkResponse)
      .then((res) => {
        dispatch({
          type: USER_LOGIN_SUCCESS
        })
        dispatch({
          type: SAVE_USER,
          user: {
            email: res.user.email,
            name: res.user.name,
          }
        })
        dispatch({
          type: LOAD_USER_DATA,
          email: res.user.email,
          name: res.user.name,
          password: password,
        })
        let accessToken;
        let refreshToken;
        accessToken = res.accessToken.split('Bearer ')[1]
        refreshToken = res.refreshToken;

        if (accessToken) {
          setCookie('accessToken', accessToken, { expires: 1200 });
        }
        if (refreshToken) {
          setCookie('refreshToken', refreshToken, { expires: 86400 })
        }
      })
      .catch(error => {
        dispatch({
          type: USER_LOGIN_FAILED
        })
        console.log(error);
      })
  }
}

export function signOut(refreshToken, history) {
  return function (dispatch) {
    console.log(refreshToken);
    dispatch({
      type: USER_LOGOUT_REQUEST
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
        token: refreshToken
      })
    })
      .then(checkResponse)
      .then(res => {
        if (res.success) {
          dispatch({
            type: USER_LOGOUT_SUCCESS
          })
          dispatch({
            type: REMOVE_USER
          })
          deleteCookie('refreshToken');
          deleteCookie('accessToken');
          history.replace({ pathname: '/login' });
        }
      })
      .catch(error => {
        dispatch({
          type: USER_LOGOUT_FAILED
        })
        console.log(error);
      })
  }
}