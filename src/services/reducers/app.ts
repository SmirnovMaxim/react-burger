import {CombinedState} from 'redux';
import {TAppStore} from '../../types/stores';
import {
  FETCH_INGREDIENTS_ERROR,
  FETCH_INGREDIENTS_SUCCESS,
  RESET_ERROR,
  RESET_INGREDIENT,
  SET_ERROR,
  SET_INGREDIENT,
} from '../actions/app';

const initialState: TAppStore = {
  error: null,
  ingredient: null,
  ingredients: [],
}

export const app = (state: CombinedState<TAppStore> = initialState, action: any): TAppStore => {
  switch (action.type) {
    case SET_ERROR:
      return {...state, error: action.error};
    case SET_INGREDIENT:
      return {...state, ingredient: action.ingredient};
    case FETCH_INGREDIENTS_SUCCESS:
      return {...state, ingredients: action.ingredients};
    case FETCH_INGREDIENTS_ERROR:
      return initialState;
    case RESET_INGREDIENT:
      return {...state, ingredient: null};
    case RESET_ERROR:
      return {...state, error: null};
    default:
      return state;
  }
}
