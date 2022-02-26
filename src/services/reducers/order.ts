import {Reducer} from 'redux';
import {Order} from '../../types';
import {TOrderStore} from '../../types/stores';
import {TOrderActions} from '../actions/order';
import {CREATE_ORDER_ERROR, CREATE_ORDER_SUCCESS} from '../constants';

const initialState: TOrderStore = {
  orders: [],
}

export const order: Reducer<TOrderStore, TOrderActions> = (state = initialState, action): TOrderStore => {
  switch (action.type) {
    case CREATE_ORDER_SUCCESS:
      const order: Order = action.order;
      return {...state, orders: [...state.orders, order]};
    case CREATE_ORDER_ERROR:
      return initialState;
    default:
      return state;
  }
}
