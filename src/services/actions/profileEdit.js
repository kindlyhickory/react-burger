export const USER_EDIT_FORM_SET_VALUE = 'USER_EDIT_FORM_SET_VALUE';
export const USER_EDIT_FORM_CHANGE_PASSWORD_VISION = 'USER_EDIT_FORM_CHANGE_PASSWORD_VISION';

export const setUserEditFormValue = (field, value) => ({
  type: USER_EDIT_FORM_SET_VALUE,
  field,
  value
})