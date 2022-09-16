import {
  CHANGE_ABLE_OF_EDIT_EMAIL,
  CHANGE_ABLE_OF_EDIT_NAME,
  CHANGE_ABLE_OF_EDIT_PASSWORD,
  CHANGE_ABLE_OF_INPUTS,
  LOAD_USER_DATA,
  RESET_USER_DATA,
  TProfileEditActions,
  USER_EDIT_FORM_CHANGE_PASSWORD_VISION,
  USER_EDIT_FORM_SET_VALUE
} from "../actions/profileEdit";
import { userInformationReducer } from "./user"

type TProfileEditState = {
  form: {
    name: string,
    email: string,
    password: string,
    startedValues: {
      email?: string;
      name?: string;
    },
  };
  isPasswordHide: boolean;
  editRequest: boolean;
  editFailed: boolean;
  isDisabled: {
    password: boolean,
    name: boolean,
    email: boolean,
  }
}

const initialState: TProfileEditState = {
  form: {
    name: '',
    email: '',
    password: '',
    startedValues: {

    }
  },
  isPasswordHide: true,
  editRequest: false,
  editFailed: false,
  isDisabled: {
    password: true,
    name: true,
    email: true,
  }
}

export const editUserReducer = (state = initialState, action: TProfileEditActions) => {
  switch (action.type) {
    case USER_EDIT_FORM_SET_VALUE:
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value
        }
      }
    case USER_EDIT_FORM_CHANGE_PASSWORD_VISION:
      return {
        ...state,
        isPasswordHide: !state.isPasswordHide,
      }
    case CHANGE_ABLE_OF_EDIT_EMAIL: {
      return {
        ...state,
        isDisabled: {
          ...state.isDisabled,
          email: !state.isDisabled.email,
        }
      }
    }
    case CHANGE_ABLE_OF_EDIT_NAME: {
      return {
        ...state,
        isDisabled: {
          ...state.isDisabled,
          name: !state.isDisabled.name,
        }
      }
    }
    case CHANGE_ABLE_OF_EDIT_PASSWORD: {
      return {
        ...state,
        isDisabled: {
          ...state.isDisabled,
          password: !state.isDisabled.password,
        }
      }
    }
    case CHANGE_ABLE_OF_INPUTS: {
      return {
        ...state,
        isDisabled: {
          password: true,
          email: true,
          name: true,
        }
      }
    }
    case LOAD_USER_DATA: {
      return {
        ...state,
        form: {
          ...state.form,
          email: action.email,
          name: action.name,
          startedValues: { ...action.startedValues }
        }
      }
    }
    case RESET_USER_DATA: {
      return {
        ...state,
        form: {
          ...state.form,
          email: state.form.startedValues.email,
          name: state.form.startedValues.name,
          password: ''
        }
      }
    }
    default:
      return state
  }
}