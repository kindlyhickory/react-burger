import {
  USER_LOGIN_FORM_SET_VALUE,
  setUserLoginFormValue,
  USER_LOGIN_FORM_CHANGE_PASSWORD_VISION,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_FAILED,
  TLogActions,
} from '../actions/login';

type TLoginState = {
  form: {
    email: string,
    password: string
  };
  isPasswordHide: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
}

const initialState: TLoginState = {
  form: {
    email: '',
    password: '',
  },
  isPasswordHide: true,
  loginRequest: false,
  loginFailed: false,
  logoutRequest: false,
  logoutFailed: false,
};

// eslint-disable-next-line default-param-last
export const userLoginReducer = (state = initialState, action: TLogActions) => {
  switch (action.type) {
    case USER_LOGIN_FORM_SET_VALUE:
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    case USER_LOGIN_FORM_CHANGE_PASSWORD_VISION:
      return {
        ...state,
        isPasswordHide: !state.isPasswordHide,
      };
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        logoutFailed: false,
        logoutRequest: false,
      };
    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      };
    case USER_LOGOUT_FAILED:
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
      };
    default:
      return state;
  }
};
