import {CombinedState} from 'redux';
import {Types} from '../../enums';
import {ConstructorItem} from '../../types';
import TBurgerConstructorStore from '../../types/stores/TBurgerConstructorStore';
import {
  ADD_INGREDIENT_TO_ORDER,
  MOVE_INGREDIENTS,
  REMOVE_INGREDIENT_FROM_ORDER,
  RESET_CURRENT_ORDER, SET_CURRENT_ORDER_NUMBER,
} from '../actions/burgerConstructor';

const initialState: TBurgerConstructorStore = {
  currentOrder: null,
  currentOrderNumber: null,
}

export const burgerConstructor = (state: CombinedState<TBurgerConstructorStore> = initialState, action: any): TBurgerConstructorStore => {
  switch (action.type) {
    case RESET_CURRENT_ORDER:
      return {...state, currentOrder: null, currentOrderNumber: null};
    case SET_CURRENT_ORDER_NUMBER:
      return {...state, currentOrderNumber: action.value};
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

        return {
          ...state,
          currentOrder: {
            ingredients: ingredients.filter(item => item.uniqueId !== action.value),
          },
        }
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
    default:
      return state;
  }
}
