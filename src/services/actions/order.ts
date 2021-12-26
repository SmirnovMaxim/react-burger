import {Dispatch} from 'redux';
import {API} from '../../config/params';
import {ConstructorItem, Order} from '../../types';
import {SET_ERROR} from './app';
import {SET_CURRENT_ORDER_NUMBER} from './burgerConstructor';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';

export const createOrder = (ingredients: ConstructorItem[]) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch({type: CREATE_ORDER_REQUEST});
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
        throw new Error(`Error: ${response.status}, ${data.message}`);
      }
      const {success, order: data} = await response.json();

      if (!success) {
        throw new Error('Failed parse data');
      }
      const order: Order = {number: data.number, ingredients};

      dispatch({type: CREATE_ORDER_SUCCESS, order});
      dispatch({type: SET_CURRENT_ORDER_NUMBER, value: order.number});
    } catch (e) {
      dispatch({type: CREATE_ORDER_ERROR});
      if (e instanceof Error) {
        dispatch({type: SET_ERROR, error: e.message});
      }
    }
  }
}
