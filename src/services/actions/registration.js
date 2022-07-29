import { config } from "../../utils/data";
import { checkResponse } from "../../utils/utils";

export const USER_REGISTRATION_FORM_SET_VALUE = 'USER_REGISTRATION_FORM_SET_VALUE';
export const USER_REGISTRATION_FORM_CHANGE_PASSWORD_VISION = 'USER_REGISTRATION_FORM_CHANGE_PASSWORD_VISION';
export const USER_REGISTRATION_REQUEST = 'USER_REGISTRATION_REQUEST';
export const USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_FAILED = 'USER_REGISTRATION_FAILED';

export const setUserRegistrationFormValue = (field, value) => ({
  type: USER_REGISTRATION_FORM_SET_VALUE,
  field,
  value
})

export function makeRegistration(name, email, password, history) {
  return function (dispatch) {
    dispatch({
      type: USER_REGISTRATION_REQUEST
    })
    fetch(`${config.baseUrl}/auth/register`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then(checkResponse)
      .then((res) => {
        dispatch({
          type: USER_REGISTRATION_SUCCESS
        })
        if (res.success) {
          history.replace({ pathname: '/login' })
        }
      })
      .catch((error) => {
        dispatch({
          type: USER_REGISTRATION_FAILED
        })
        console.log(error)
      })
  }
}