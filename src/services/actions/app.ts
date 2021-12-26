import {Dispatch} from 'redux';
import {API} from '../../config/params';

export const SET_ERROR = 'SET_ERROR';
export const SET_INGREDIENT = 'SET_INGREDIENT';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_ERROR = 'FETCH_INGREDIENTS_ERROR';
export const RESET_INGREDIENT = 'RESET_INGREDIENT';
export const RESET_ERROR = 'RESET_ERROR';

export const getIngredients = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await fetch(`${API}ingredients`);
      if (!response.ok) {
        dispatch({type: SET_ERROR, error: `Error: ${response.status}`})
        return;
      }
      const {success, data} = await response.json();
      if (!success) {
        dispatch({type: SET_ERROR, error: 'Failed parse data'})
        return;
      }
      dispatch({type: FETCH_INGREDIENTS_SUCCESS, ingredients: data});
    } catch (e) {
      const message = (e as Error).message;
      dispatch({type: SET_ERROR, error: message});
      dispatch({type: FETCH_INGREDIENTS_ERROR});
    }
  }
}

