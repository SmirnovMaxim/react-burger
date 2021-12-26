import {CombinedState} from 'redux';
import {Types} from '../../enums';
import {ConstructorItem, Order} from '../../types';
import {TOrderStore} from '../../types/stores';
import {
  ADD_INGREDIENT_TO_ORDER,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_SUCCESS,
  MOVE_INGREDIENTS,
  REMOVE_INGREDIENT_FROM_ORDER,
  RESET_CURRENT_ORDER,
} from '../actions/order';

const initialState: TOrderStore = {
  orders: [],
  currentOrder: null,
  currentOrderNumber: null,
}

export const order = (state: CombinedState<TOrderStore> = initialState, action: any): TOrderStore => {
  switch (action.type) {
    case CREATE_ORDER_SUCCESS:
      const order: Order = action.order;
      return {...state, orders: [...state.orders, order], currentOrderNumber: order.number};
    case RESET_CURRENT_ORDER:
      return {...state, currentOrder: null, currentOrderNumber: null};
    case ADD_INGREDIENT_TO_ORDER:
      const value: ConstructorItem = action.value;
      if (!state.currentOrder) {
        return {...state, currentOrder: {ingredients: [value]}};
      }

      const isBun = value.type === Types.BUN;
      let {ingredients} = state.currentOrder;

      if (isBun) {
        // замена булки
        ingredients = ingredients.map(_ => _.position === value.position && _.type === value.type ? value : _);
        // добавление
        if (!ingredients.find(_ => _.position === value.position && _.type === value.type)) {
          ingredients.push(value);
        }
      } else {
        ingredients.splice(-2, 0, value);
      }

      return {...state, currentOrder: {ingredients}};
    case REMOVE_INGREDIENT_FROM_ORDER:
      const removeFn = () => {
        if (!state.currentOrder) {
          return state;
        }

        const {ingredients} = state.currentOrder;
        ingredients.splice(action.value, 1);

        return {...state, currentOrder: {ingredients}}
      }
      return removeFn();
    case MOVE_INGREDIENTS:
      const moveFn = () => {
        if (!state.currentOrder) {
          return state;
        }

        const {dragIndex, hoverIndex} = action;
        const ingredients = [...state.currentOrder.ingredients];
        const movedIngredient = ingredients[hoverIndex];
        ingredients[hoverIndex] = ingredients[dragIndex];
        ingredients[dragIndex] = movedIngredient;

        return {...state, currentOrder: {ingredients}};
      }
      return moveFn();
    case CREATE_ORDER_ERROR:
      return initialState;
    default:
      return state;
  }
}
