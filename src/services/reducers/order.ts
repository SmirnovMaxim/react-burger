import {CombinedState} from 'redux';
import {Order} from '../../types';
import {TOrderStore} from '../../types/stores';
import {CREATE_ORDER_ERROR, CREATE_ORDER_SUCCESS} from '../actions/order';

const initialState: TOrderStore = {
  orders: [],
}

export const order = (state: CombinedState<TOrderStore> = initialState, action: any): TOrderStore => {
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
