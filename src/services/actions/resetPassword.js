export const RESET_PASSWORD_SET_FORM = 'RESET_PASSWORD_SET_FORM';
export const RESET_PASSWORD_CHANGE_PASSWORD_VISION = "RESET_PASSWORD_CHANGE_PASSWORD_VISION";


export const setPasswordForgotFormValue = (field, value) => ({
  type: RESET_PASSWORD_SET_FORM,
  field,
  value
})