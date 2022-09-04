export const FORGOT_PASSWORD_SET_FORM: 'FORGOT_PASSWORD_SET_FORM' = 'FORGOT_PASSWORD_SET_FORM';


export interface ISetUserForgotFormValue {
  readonly type: typeof FORGOT_PASSWORD_SET_FORM;
  readonly field: string;
  readonly value: string;
}


export const setUserForgotFormValue = (field: string, value: string): ISetUserForgotFormValue => ({
  type: FORGOT_PASSWORD_SET_FORM,
  field,
  value
})