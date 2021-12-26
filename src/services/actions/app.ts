import {Dispatch} from 'redux';
import {API} from '../../config/params';

export const SET_ERROR = 'SET_ERROR';
export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_ERROR = 'FETCH_INGREDIENTS_ERROR';
export const RESET_ERROR = 'RESET_ERROR';

export const getIngredients = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch({type: FETCH_INGREDIENTS_REQUEST});
      const response = await fetch(`${API}ingredients`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const {success, data} = await response.json();
      if (!success) {
        throw new Error('Failed parse data');
      }
      dispatch({type: FETCH_INGREDIENTS_SUCCESS, ingredients: data});
    } catch (e) {
      dispatch({type: FETCH_INGREDIENTS_ERROR});
      if (e instanceof Error) {
        dispatch({type: SET_ERROR, error: e.message});
      }
    }
  }
}

