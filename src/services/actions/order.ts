import {Dispatch} from 'redux';
import {API} from '../../config/params';
import {ConstructorItem, Order} from '../../types';
import {SET_ERROR} from './app';

export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';
export const ADD_INGREDIENT_TO_ORDER = 'ADD_INGREDIENT_TO_ORDER';
export const REMOVE_INGREDIENT_FROM_ORDER = 'REMOVE_INGREDIENT_FROM_ORDER';
export const RESET_CURRENT_ORDER = 'RESET_CURRENT_ORDER';
export const MOVE_INGREDIENTS = 'MOVE_INGREDIENTS';

export const createOrder = (ingredients: ConstructorItem[]) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const ids = ingredients.map(ingredient => ingredient.id);
      const body = {ingredients: ids};
      const response = await fetch(`${API}orders`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = JSON.parse(await response.text());
        dispatch({type: SET_ERROR, error: `Error: ${response.status}, ${data.message}`})
        return;
      }
      const {success, order: data} = await response.json();

      if (!success) {
        dispatch({type: SET_ERROR, error: 'Failed parse data'});
        return;
      }
      const order: Order = {number: data.number, ingredients};

      dispatch({type: CREATE_ORDER_SUCCESS, order});
    } catch (e) {
      const message = (e as Error).message;
      dispatch({type: CREATE_ORDER_ERROR});
      dispatch({type: SET_ERROR, error: message});
    }
  }
}
