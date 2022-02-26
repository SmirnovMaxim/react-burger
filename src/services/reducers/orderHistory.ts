import {Reducer} from 'redux';
import TOrderHistoryStore from '../../types/stores/TOrderHistoryStore';
import {TOrderHistoryActions} from '../actions/orderHistory';
import {SET_ORDER_HISTORY, SET_ORDER_SUCCESS} from '../constants';

const initialState: TOrderHistoryStore = {
  orders: [],
}
export const orderHistory: Reducer<TOrderHistoryStore, TOrderHistoryActions> = (state = initialState, action): TOrderHistoryStore => {
  switch (action.type) {
    case SET_ORDER_HISTORY:
      return {
        ...state,
        orders: action.data.orders,
        total: action.data.total,
        totalToday: action.data.totalToday,
      };
    case SET_ORDER_SUCCESS:
      return {
        ...state,
        current: action.current,
      };
    default:
      return state;
  }
}
