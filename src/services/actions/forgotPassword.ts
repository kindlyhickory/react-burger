export const FORGOT_PASSWORD_SET_FORM: 'FORGOT_PASSWORD_SET_FORM' = 'FORGOT_PASSWORD_SET_FORM';

export interface ISetUserForgotFormValue {
  type: typeof FORGOT_PASSWORD_SET_FORM;
  field: string;
  value: string;
}

export type TUserForgotForm =
  | ISetUserForgotFormValue

export const setUserForgotFormValue = (field: string, value: string): ISetUserForgotFormValue => ({
  type: FORGOT_PASSWORD_SET_FORM,
  field,
  value,
});
