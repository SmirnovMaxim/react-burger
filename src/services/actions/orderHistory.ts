import {API} from '../../config/params';
import {TOrderListResponse} from '../../types/responses';
import {TOrder} from '../../types/responses/TOrderListResponse';
import {AppDispatch, AppThunk} from '../../types/stores/TRootStore';
import {SET_ORDER_SUCCESS, SET_ORDER_FAILED, SET_ORDER_HISTORY, SET_ORDER_REQUEST} from '../constants';
import {setError} from './app';

export interface ISetOrderHistory {
  readonly type: typeof SET_ORDER_HISTORY;
  readonly data: TOrderListResponse;
}

export interface ISetOrder {
  readonly type: typeof SET_ORDER_SUCCESS;
  readonly current: TOrder;
}

export interface ISetOrderRequest {
  readonly type: typeof SET_ORDER_REQUEST;
}

export interface ISetOrderFailed {
  readonly type: typeof SET_ORDER_FAILED;
}

export type TOrderHistoryActions =
  ISetOrderHistory
  | ISetOrder
  | ISetOrderRequest
  | ISetOrderFailed;

export const setOrderHistory = (data: TOrderListResponse): ISetOrderHistory => ({
  type: SET_ORDER_HISTORY,
  data,
});

export const setOrder = (current: TOrder): ISetOrder => ({
  type: SET_ORDER_SUCCESS,
  current,
})

export const fetchOrder: AppThunk = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({type: SET_ORDER_REQUEST});
      const response = await fetch(`${API}orders/${id}`)

      if (!response.ok) {
        const data = JSON.parse(await response.text());
        throw new Error(`Error: ${response.status}, ${data.message}`);
      }

      const {success, orders: data} = await response.json();
      if (!success || data.length > 1) {
        throw new Error('Failed parse data');
      }

      dispatch(setOrder(data[0]));
    } catch (e) {
      dispatch({type: SET_ORDER_FAILED});
      if (e instanceof Error) {
        dispatch(setError(e.message));
      }
    }
  }
}
