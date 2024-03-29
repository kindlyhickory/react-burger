import { config } from '../../utils/data';
import { checkResponse } from '../../utils/utils';
import { AppDispatch, AppThunk, TUserLog } from '../../types';

export const USER_REGISTRATION_FORM_SET_VALUE = 'USER_REGISTRATION_FORM_SET_VALUE' as const;
export const USER_REGISTRATION_FORM_CHANGE_PASSWORD_VISION = 'USER_REGISTRATION_FORM_CHANGE_PASSWORD_VISION' as const;
export const USER_REGISTRATION_REQUEST = 'USER_REGISTRATION_REQUEST' as const;
export const USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS' as const;
export const USER_REGISTRATION_FAILED = 'USER_REGISTRATION_FAILED' as const;

export interface IUserRegistrationFailed {
  type: typeof USER_REGISTRATION_FAILED
}

export interface IUserRegistrationSuccess {
  type: typeof USER_REGISTRATION_SUCCESS
}

export interface IUserRegistrationRequest {
  type: typeof USER_REGISTRATION_REQUEST
}

export interface IUserRegistrationFormChangePasswordVision {
  type: typeof USER_REGISTRATION_FORM_CHANGE_PASSWORD_VISION
}

export interface ISetUserRegistrationFormValue {
  type: typeof USER_REGISTRATION_FORM_SET_VALUE;
  field: string;
  value: string;
}
// eslint-disable-next-line max-len
export const setUserRegistrationFormValue = (field: string, value: string):ISetUserRegistrationFormValue => ({
  type: USER_REGISTRATION_FORM_SET_VALUE,
  field,
  value,
});

export type TRegistrationActions =
  | ISetUserRegistrationFormValue
  | IUserRegistrationFormChangePasswordVision
  | IUserRegistrationRequest
  | IUserRegistrationSuccess
  | IUserRegistrationFailed

// eslint-disable-next-line max-len
export const makeRegistration: AppThunk = (name: string, email: string, password:string, history: any) => function (dispatch: AppDispatch) {
  dispatch({
    type: USER_REGISTRATION_REQUEST,
  });
  fetch(`${config.baseUrl}/auth/register`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })
    .then((res) => checkResponse<TUserLog>(res))
    .then((res) => {
      dispatch({
        type: USER_REGISTRATION_SUCCESS,
      });
      if (res.success) {
        history.replace({ pathname: '/login' });
      }
    })
    .catch((error) => {
      dispatch({
        type: USER_REGISTRATION_FAILED,
      });
      console.log(error);
    });
};
