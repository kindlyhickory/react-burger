import { FORGOT_PASSWORD_SET_FORM, TUserForgotForm } from '../actions/forgotPassword';

type TForgotPasswordState = {
  form: { email: string },
  forgotPasswordRequest: boolean,
  forgotPasswordFailed: boolean
}

const initialState: TForgotPasswordState = {
  form: {
    email: '',
  },
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
};

// eslint-disable-next-line default-param-last
export const forgotPasswordReducer = (state = initialState, action: TUserForgotForm) => {
  switch (action.type) {
    case FORGOT_PASSWORD_SET_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };

    default:
      return state;
  }
};
