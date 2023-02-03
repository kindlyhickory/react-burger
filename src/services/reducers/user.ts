import {
  AUTH_CHECKED,
  CHANGE_STATUS_SENDING_FORGOT_PASSWORD_MESSAGE,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  REMOVE_USER,
  SAVE_USER,
  SEND_FORGOT_PASSWORD_CODE_FAILED,
  SEND_FORGOT_PASSWORD_CODE_REQUEST,
  SEND_FORGOT_PASSWORD_CODE_SUCCESS,
  SEND_RESET_PASSWORD_FAILED,
  SEND_RESET_PASSWORD_REQUEST,
  SEND_RESET_PASSWORD_SUCCESS, TUserActions,
  UPDATE_TOKEN_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_USER_DATA_FAILED,
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_SUCCESS,
} from '../actions/user';

type TUserState = {
  user: {
    email: string,
    name: string,
  },

  isUserLoaded: boolean,

  getInfromationRequest: boolean,
  getInfromationFailed: boolean,

  updateInfromationRequest: boolean,
  updateInfromationFailed: boolean,

  isAuthChecked: boolean,

  updateTokenRequest: boolean,
  updateTokenFailed: boolean,

  forgotPasswordCodeRequest: boolean,
  forgotPasswordCodeFailed: boolean,

  forgotPasswordEmailRequest: boolean,
  forgotPasswordEmailFailed: boolean,

  resetPasswordRequest: boolean,
  resetPasswordFailed: boolean,

  isForgotPasswordCodeSent: boolean,
}

const initialState: TUserState = {
  user: {
    email: '',
    name: '',
  },

  isUserLoaded: false,

  getInfromationRequest: false,
  getInfromationFailed: false,

  updateInfromationRequest: false,
  updateInfromationFailed: false,

  isAuthChecked: false,

  updateTokenRequest: false,
  updateTokenFailed: true,

  forgotPasswordCodeRequest: false,
  forgotPasswordCodeFailed: false,

  forgotPasswordEmailRequest: false,
  forgotPasswordEmailFailed: false,

  resetPasswordRequest: false,
  resetPasswordFailed: false,

  isForgotPasswordCodeSent: false,
};

export function userInformationReducer(state = initialState, action: TUserActions) {
  switch (action.type) {
    case AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: true,
      };
    case SAVE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.user.email,
          name: action.user.name,
          password: action.user.password,
        },
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        getInfromationRequest: true,
        getInfromationFailed: false,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isUserLoaded: true,
        getInfromationRequest: false,
        getInfromationFailed: false,
      };
    case GET_USER_FAILED:
      return {
        ...state,
        isUserLoaded: false,
        getInfromationFailed: true,
        getInfromationRequest: false,
      };
    case REMOVE_USER: {
      return {
        ...state,
        user: {
          email: '',
          name: '',
        },
        isUserLoaded: false,
      };
    }
    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        updateTokenRequest: true,
        updateTokenFailed: false,
      };
    }
    case UPDATE_TOKEN_FAILED: {
      return {
        ...state,
        updateTokenFailed: true,
        updateTokenRequest: false,
      };
    }
    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        updateTokenFailed: false,
        updateTokenRequest: false,
      };
    }
    case SEND_FORGOT_PASSWORD_CODE_REQUEST: {
      return {
        ...state,
        forgotPasswordCodeRequest: true,
        forgotPasswordCodeFailed: false,
      };
    }
    case SEND_FORGOT_PASSWORD_CODE_FAILED: {
      return {
        ...state,
        forgotPasswordCodeFailed: true,
        forgotPasswordCodeRequest: false,
      };
    }
    case SEND_FORGOT_PASSWORD_CODE_SUCCESS: {
      return {
        ...state,
        forgotPasswordCodeFailed: false,
        forgotPasswordCodeRequest: false,
      };
    }
    case CHANGE_STATUS_SENDING_FORGOT_PASSWORD_MESSAGE: {
      return {
        ...state,
        isForgotPasswordCodeSent: !state.isForgotPasswordCodeSent,
      };
    }
    case SEND_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      };
    }
    case SEND_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
      };
    }
    case SEND_RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: true,
      };
    }

    case UPDATE_USER_DATA_REQUEST: {
      return {
        ...state,
        updateInfromationRequest: true,
        updateInfromationFailed: false,
      };
    }
    case UPDATE_USER_DATA_FAILED: {
      return {
        ...state,
        updateInfromationRequest: false,
        updateInfromationFailed: true,
      };
    }
    case UPDATE_USER_DATA_SUCCESS: {
      return {
        ...state,
        updateInfromationRequest: false,
        updateInfromationFailed: false,
        user: {
          email: action.email,
          name: action.name,
        },
      };
    }
    default:
      return state;
  }
}
