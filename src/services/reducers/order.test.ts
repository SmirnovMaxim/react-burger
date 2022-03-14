import {Types} from '../../enums';
import {Ingredient, Order} from '../../types';
import {TOrderStore} from '../../types/stores';
import data from '../../utils/data.json';
import {getIngredient} from '../../utils/helpers';
import {createOrderSuccess} from '../actions/order';
import * as TYPES from '../constants';
import {order as orderReducer} from './order';

const ingredients = data as Ingredient[];

const createOrder = (number: number): Order => ({
    number,
    ingredients: ingredients.slice(0, 5).map(item => getIngredient(item, item.type === Types.BUN ? 'top' : undefined)),
})

describe('order reducer', () => {
  it('should return the initial state', () => {
    // @ts-ignore
    expect(orderReducer(undefined, {})).toEqual({orders: []});
  });

  it(`should handle ${TYPES.CREATE_ORDER_SUCCESS}`, () => {
    let state: TOrderStore = {
      orders: [],
    };
    let order = createOrder(1);
    let action = createOrderSuccess(order);
    let expectedState = {orders: [action.order]};

    expect(orderReducer(state, action)).toEqual(expectedState);

    state = {...expectedState};
    order = createOrder(2);
    action = createOrderSuccess(order);
    expectedState.orders = [
      ...expectedState.orders,
      action.order,
    ];
    expect(orderReducer(state, action)).toEqual(expectedState);
    expect(orderReducer(state, action).orders.length).toEqual(2);
  });

  it(`should handle ${TYPES.CREATE_ORDER_ERROR}`, () => {
    const action = createOrderSuccess(createOrder(1));
    const state: TOrderStore = {
      orders: [action.order],
    };
    expect(orderReducer(state, {type: TYPES.CREATE_ORDER_ERROR})).toEqual({orders: []});
  });

});
