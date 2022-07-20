export const FORGOT_PASSWORD_SET_FORM = 'FORGOT_PASSWORD_SET_FORM';


export const setUserForgotFormValue = (field, value) => ({
  type: FORGOT_PASSWORD_SET_FORM,
  field,
  value
})