import { USER_EDIT_FORM_CHANGE_PASSWORD_VISION, USER_EDIT_FORM_SET_VALUE } from "../actions/profileEdit"

const initialState = {
  form: {
    name: 'name',
    email: 'email@123',
    password: '1234',
  },
  isPasswordHide: true,
  editRequest: false,
  editFailed: false,
}

export const editUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_EDIT_FORM_SET_VALUE:
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value
        }
      }
    case USER_EDIT_FORM_CHANGE_PASSWORD_VISION:
      return {
        ...state,
        isPasswordHide: !state.isPasswordHide,
      }
    default:
      return state
  }
}