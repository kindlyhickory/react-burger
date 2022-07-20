import { USER_LOGIN_FORM_SET_VALUE, setUserLoginFormValue, USER_LOGIN_FORM_CHANGE_PASSWORD_VISION, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED } from "../actions/login";

const initialState = {
  form: {
    email: '',
    password: '',
  },
  isPasswordHide: true,
  loginRequest: false,
  loginFailed: false,
}

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_FORM_SET_VALUE:
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value
        }
      }
    case USER_LOGIN_FORM_CHANGE_PASSWORD_VISION:
      return {
        ...state,
        isPasswordHide: !state.isPasswordHide,
      }
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
      }
    case USER_LOGIN_FAILED:
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      }
    default:
      return state;
  }
}