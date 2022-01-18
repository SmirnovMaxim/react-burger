import {CombinedState} from 'redux';
import {Types} from '../../enums';
import {ConstructorItem} from '../../types';
import TBurgerConstructorStore from '../../types/stores/TBurgerConstructorStore';
import {
  ADD_INGREDIENT_TO_ORDER,
  MOVE_INGREDIENTS,
  REMOVE_INGREDIENT_FROM_ORDER,
  RESET_CURRENT_ORDER,
  SET_NUMBER,
} from '../actions/burgerConstructor';

const initialState: TBurgerConstructorStore = {
  currentOrder: null,
}

export const burgerConstructor = (state: CombinedState<TBurgerConstructorStore> = initialState, action: any): TBurgerConstructorStore => {
  switch (action.type) {
    case RESET_CURRENT_ORDER:
      return initialState;
    case ADD_INGREDIENT_TO_ORDER:
      const value: ConstructorItem = action.value;
      if (!state.currentOrder) {
        return {...state, currentOrder: {ingredients: [value]}};
      }

      let {ingredients} = state.currentOrder;
      const isBun = value.type === Types.BUN;
      const hasBuns = ingredients.some(_ => _.type === Types.BUN);

      if (isBun) {
        // замена булки
        ingredients = ingredients.map(_ => _.position === value.position && _.type === value.type ? value : _);
        // добавление
        const existBun = ingredients.some(_ => _.position === value.position && _.type === value.type);
        if (!existBun) {
          const isTop = value.position === 'top';
          isTop ? ingredients.splice(0, 0, value) : ingredients.push(value);
        }
      } else {
        ingredients.splice(hasBuns ? ingredients.length - 1 : ingredients.length, 0, value);
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
        const dragIngredient = ingredients[dragIndex];

        ingredients.splice(dragIndex, 1);
        ingredients.splice(hoverIndex, 0, dragIngredient);

        return {...state, currentOrder: {ingredients}};
      }
      return moveFn();
    case SET_NUMBER:
      return {...state, number: action.number};
    default:
      return state;
  }
}
