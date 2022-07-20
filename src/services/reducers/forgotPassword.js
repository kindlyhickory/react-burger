import { FORGOT_PASSWORD_SET_FORM } from "../actions/forgotPassword";

const initialState = {
  form: {
    email: ''
  },
  forgotPasswordRequest: false,
  forgotPasswordFailde: false,
}

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_SET_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        }
      }

    default:
      return state
  }
}