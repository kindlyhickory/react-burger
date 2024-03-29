export const USER_EDIT_FORM_SET_VALUE = 'USER_EDIT_FORM_SET_VALUE' as const;
export const USER_EDIT_FORM_CHANGE_PASSWORD_VISION = 'USER_EDIT_FORM_CHANGE_PASSWORD_VISION' as const;
export const CHANGE_ABLE_OF_EDIT_PASSWORD = 'CHANGE_ABLE_OF_EDIT_PASSWORD' as const;
export const CHANGE_ABLE_OF_EDIT_NAME = 'CHANGE_ABLE_OF_EDIT_NAME' as const;
export const CHANGE_ABLE_OF_EDIT_EMAIL = 'CHANGE_ABLE_OF_EDIT_EMAIL' as const;
export const LOAD_USER_DATA = 'LOAD_USER_DATA' as const;
export const RESET_USER_DATA = 'RESET_USER_DATA' as const;
export const CHANGE_ABLE_OF_INPUTS = 'CHANGE_ABLE_OF_INPUTS' as const;

export interface IChangeAbleOfInputs {
  type: typeof CHANGE_ABLE_OF_INPUTS;
}

export interface IResetUserData {
  type: typeof RESET_USER_DATA;
}

export interface ILoadUserData {
  type: typeof LOAD_USER_DATA;
  email: string;
  name: string;
  password: string;
  startedValues: {
    email?: string,
    name?: string,
  };
}

export interface IChangeAbleOfEditEmail {
  type: typeof CHANGE_ABLE_OF_EDIT_EMAIL;
}

export interface IChangeAbleOfEditName {
  type: typeof CHANGE_ABLE_OF_EDIT_NAME;
}

export interface IChangeAbleOfEditPassword {
  type: typeof CHANGE_ABLE_OF_EDIT_PASSWORD;
}

export interface IUserEditFormChangePasswordVision {
  type: typeof USER_EDIT_FORM_CHANGE_PASSWORD_VISION;
}

export interface ISetUserEditFormValue {
  type: typeof USER_EDIT_FORM_SET_VALUE;
  field: string;
  value: string;
}

export type TProfileEditActions =
  | ISetUserEditFormValue
  | IUserEditFormChangePasswordVision
  | IChangeAbleOfEditPassword
  | IChangeAbleOfEditName
  | IChangeAbleOfEditEmail
  | ILoadUserData
  | IResetUserData
  | IChangeAbleOfInputs

export const setUserEditFormValue = (field: string, value: string): ISetUserEditFormValue => ({
  type: USER_EDIT_FORM_SET_VALUE,
  field,
  value,
});
