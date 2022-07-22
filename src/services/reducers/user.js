import { CHANGE_USER_LOAD, GET_USER, GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, REMOVE_USER, SAVE_USER, UPDATE_TOKEN_FAILED, UPDATE_TOKEN_REQUEST, UPDATE_TOKEN_SUCCESS } from "../actions/user";


const initialState = {
  user: {
    email: '',
    name: '',
  },
  isUserLoaded: false,
  isVisitedForgotPasswordPage: false,
  getInfromationRequest: false,
  getInfromationFailed: false,
  updateInfromationRequest: false,
  updateInfromationFailed: false,
  updateTokenRequest: false,
  updateTokenFailed: true,
}

export function userInformationReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        user: {
          email: action.user.email,
          name: action.user.name
        }
      }
    case GET_USER_REQUEST:
      return {
        ...state,
        getInfromationRequest: true,
        getInfromationFailed: false,
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        isUserLoaded: true,
        getInfromationRequest: false,
        getInfromationFailed: false,
      }
    case GET_USER_FAILED:
      return {
        ...state,
        getInfromationFailed: true,
        getInfromationRequest: false,
      }
    case REMOVE_USER: {
      return {
        ...state,
        user: {
          email: '',
          name: '',
        },
        isUserLoaded: false,
      }
    }
    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        updateTokenRequest: true,
        updateTokenFailed: false,
      }
    }
    case UPDATE_TOKEN_FAILED: {
      return {
        ...state,
        updateTokenFailed: true,
        updateTokenRequest: false,
      }
    }
    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        updateTokenFailed: false,
        updateTokenRequest: false,
      }
    }
    default:
      return state
  }
}