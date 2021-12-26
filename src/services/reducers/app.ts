import {CombinedState} from 'redux';
import {TAppStore} from '../../types/stores';
import {FETCH_INGREDIENTS_ERROR, FETCH_INGREDIENTS_SUCCESS, RESET_ERROR, SET_ERROR} from '../actions/app';

const initialState: TAppStore = {
  error: null,
  ingredients: [],
}

export const app = (state: CombinedState<TAppStore> = initialState, action: any): TAppStore => {
  switch (action.type) {
    case SET_ERROR:
      return {...state, error: action.error};
    case FETCH_INGREDIENTS_SUCCESS:
      return {...state, ingredients: action.ingredients};
    case FETCH_INGREDIENTS_ERROR:
      return initialState;
    case RESET_ERROR:
      return {...state, error: null};
    default:
      return state;
  }
}
