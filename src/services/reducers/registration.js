import { USER_REGISTRATION_FORM_SET_VALUE, USER_REGISTRATION_FORM_CHANGE_PASSWORD_VISION, USER_REGISTRATION_REQUEST, USER_REGISTRATION_SUCCESS, USER_REGISTRATION_FAILED } from "../actions/registration";

const initialState = {
  form: {
    name: '',
    email: '',
    password: '',
  },
  isPasswordHide: true,
  registrationRequest: false,
  registrationFailed: false,
}

export const userRegistrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTRATION_FORM_SET_VALUE:
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value
        }
      }
    case USER_REGISTRATION_FORM_CHANGE_PASSWORD_VISION:
      return {
        ...state,
        isPasswordHide: !state.isPasswordHide,
      }
    case USER_REGISTRATION_REQUEST:
      return {
        ...state,
        registrationRequest: true,
        registrationFailed: false,
      }
    case USER_REGISTRATION_SUCCESS:
      return {
        ...state,
        registrationFailed: false,
        registrationRequest: false,
      }
    case USER_REGISTRATION_FAILED:
      return {
        ...state,
        registrationFailed: true,
        registrationRequest: false,
      }
    default:
      return state;
  }
}