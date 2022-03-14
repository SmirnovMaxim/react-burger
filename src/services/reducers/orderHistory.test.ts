import {Ingredient} from '../../types';
import {TOrder} from '../../types/responses/TOrderListResponse';
import TOrderHistoryStore from '../../types/stores/TOrderHistoryStore';
import data from '../../utils/data.json';
import {setOrder, setOrderHistory} from '../actions/orderHistory';
import * as TYPES from '../constants';
import {orderHistory} from './orderHistory';

const ingredients = data as Ingredient[];

const createOrder = (number: number): TOrder => ({
  createdAt: (new Date()).toDateString(),
  number,
  ingredients: ingredients.slice(0, 5).map(item => item._id),
  name: 'name',
  status: 'created',
  updatedAt: (new Date()).toDateString(),
  _id: 'sdf234',
});

describe('orderHistory reducer', () => {
  it('should return the initial state', () => {
    // @ts-ignore
    expect(orderHistory(undefined, {})).toEqual({orders: []});
  });

  it(`should handle ${TYPES.SET_ORDER_HISTORY}`, () => {
    let state: TOrderHistoryStore = {
      orders: [],
    };
    let order = createOrder(1);
    let action = setOrderHistory({
      success: true,
      total: 1,
      totalToday: 1,
      orders: [order],
    });
    let expectedState: TOrderHistoryStore = {
      total: action.data.total,
      totalToday: action.data.totalToday,
      orders: action.data.orders,
    };

    expect(orderHistory(state, action)).toEqual(expectedState);
  });

  it(`should handle ${TYPES.SET_ORDER_SUCCESS}`, () => {
    let state: TOrderHistoryStore = {
      orders: [],
    };
    const action = setOrder(createOrder(1));

    expect(orderHistory(state, action)).toEqual({
      ...state,
      current: action.current,
    });
  });
});
