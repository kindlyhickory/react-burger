import { config } from "../../utils/data";
import { checkResponse } from "../../utils/utils";

export const USER_LOGIN_FORM_SET_VALUE = 'USER_LOGIN_FORM_SET_VALUE';
export const USER_LOGIN_FORM_CHANGE_PASSWORD_VISION = 'USER_LOGIN_FORM_CHANGE_PASSWORD_VISION';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';


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
        console.log(res);
      })
      .catch(error => {
        dispatch({
          type: USER_LOGIN_FAILED
        })
        console.log(error);
      })
  }
}