import {API} from '../../config/params';
import {ConstructorItem, Order} from '../../types';
import {AppDispatch, AppThunk} from '../../types/stores/TRootStore';
import {updateToken} from '../../utils/auth';
import {getCookie} from '../../utils/helpers';
import {CREATE_ORDER_ERROR, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS} from '../constants';
import {setError} from './app';
import {setNumber} from './burgerConstructor';

export interface ICreateOrderError {
  readonly type: typeof CREATE_ORDER_ERROR;
}

export interface ICreateOrderRequestAction {
  readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccessAction {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly order: Order;
}

export type TOrderActions =
  ICreateOrderError
  | ICreateOrderRequestAction
  | ICreateOrderSuccessAction;

export const createOrderSuccess = (order: Order): ICreateOrderSuccessAction => ({
  type: CREATE_ORDER_SUCCESS,
  order,
});

export const createOrder: AppThunk = (ingredients: ConstructorItem[]) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({type: CREATE_ORDER_REQUEST});
      let token = getCookie('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (!token) {
        if (refreshToken) {
          await updateToken(refreshToken);
          token = getCookie('accessToken');
        } else {
          return;
        }
      }
      const ids = ingredients.map(ingredient => ingredient.id);
      const body = {ingredients: ids};
      const response = await fetch(`${API}orders`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${token}`,
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

      dispatch(setNumber(order.number));
      dispatch(createOrderSuccess(order));
    } catch (e) {
      dispatch({type: CREATE_ORDER_ERROR});
      if (e instanceof Error) {
        dispatch(setError(e.message));
      }
    }
  }
}
