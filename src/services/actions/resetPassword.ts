export const RESET_PASSWORD_SET_FORM = 'RESET_PASSWORD_SET_FORM' as const;
export const RESET_PASSWORD_CHANGE_PASSWORD_VISION = 'RESET_PASSWORD_CHANGE_PASSWORD_VISION' as const;

export interface IResetPasswordChangePasswordVision {
  type: typeof RESET_PASSWORD_CHANGE_PASSWORD_VISION
}

export interface ISetPasswordForgotFormValue {
  type: typeof RESET_PASSWORD_SET_FORM;
  field: string;
  value: string;
}

export type TResetPasswordActions =
  | ISetPasswordForgotFormValue
  | IResetPasswordChangePasswordVision

// eslint-disable-next-line max-len
export const setPasswordForgotFormValue = (field: string, value: string): ISetPasswordForgotFormValue => ({
  type: RESET_PASSWORD_SET_FORM,
  field,
  value,
});
