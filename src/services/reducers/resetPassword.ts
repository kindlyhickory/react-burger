import {
  RESET_PASSWORD_CHANGE_PASSWORD_VISION,
  RESET_PASSWORD_SET_FORM,
  TResetPasswordActions,
} from '../actions/resetPassword';

type TResetPasswordState = {
  form: {
    password: string;
    code: string
  };
  isPasswordHide: boolean;
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
}

const initialState: TResetPasswordState = {
  form: {
    password: '',
    code: '',
  },
  isPasswordHide: true,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};

export const resetPasswordReducer = (state = initialState, action: TResetPasswordActions) => {
  switch (action.type) {
    case RESET_PASSWORD_SET_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    case RESET_PASSWORD_CHANGE_PASSWORD_VISION:
      return {
        ...state,
        isPasswordHide: !state.isPasswordHide,
      };
    default:
      return state;
  }
};
