import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  SHOW_MODAL_INGREDIENT,
  HIDE_MODAL_INGREDIENT,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  REMOVE_BUN_FROM_CONSTRUCTOR,
  UPDATE_CONSTRUCTOR_LIST,
  CLEAR_CONSTRUCTOR_LIST
} from "../actions/ingredients";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  ingredientsInConstructor: [],
  bunInConstructor: null,

  currentViewedIngredient: null,
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsFailed: false,
        ingredientsRequest: false,
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      }
    }
    case SHOW_MODAL_INGREDIENT: {
      return {
        ...state,
        currentViewedIngredient: action.currentViewedIngredient
      }
    }
    case HIDE_MODAL_INGREDIENT: {
      return {
        ...state,
        currentViewedIngredient: null,
      }
    }
    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsInConstructor: [...state.ingredientsInConstructor, action.ingredient]
      }
    }
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsInConstructor: [...state.ingredientsInConstructor.filter(ingredient => ingredient.id !== action.ingredient.id)]
      }
    }
    case ADD_BUN_TO_CONSTRUCTOR: {
      return {
        ...state,
        bunInConstructor: action.bun,
      }
    }
    case REMOVE_BUN_FROM_CONSTRUCTOR: {
      return {
        ...state,
        bunInConstructor: null,
      }
    }
    case CLEAR_CONSTRUCTOR_LIST: {
      return {
        ...state,
        bunInConstructor: null,
        ingredientsInConstructor: [],
      }
    }
    case UPDATE_CONSTRUCTOR_LIST: {
      const ingredientsInConstructor = [...state.ingredientsInConstructor];
      ingredientsInConstructor.splice(
        action.toIndex,
        0,
        ingredientsInConstructor.splice(action.fromIndex, 1)[0]);
      return {
        ...state,
        ingredientsInConstructor: [...ingredientsInConstructor],
      }
    }
    default:
      return state
  }
}