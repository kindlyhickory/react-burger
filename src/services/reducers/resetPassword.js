import { RESET_PASSWORD_CHANGE_PASSWORD_VISION, RESET_PASSWORD_SET_FORM } from "../actions/resetPassword";

const initialState = {
  form: {
    password: '',
    code: ''
  },
  isPasswordHide: true,
  resetPasswordRequest: false,
  resetPasswordFailde: false,
}

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_SET_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        }
      }
    case RESET_PASSWORD_CHANGE_PASSWORD_VISION:
      return {
        ...state,
        isPasswordHide: !state.isPasswordHide,
      }
    default:
      return state

  }

}
