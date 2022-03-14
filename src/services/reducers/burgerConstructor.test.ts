import {Types} from '../../enums';
import {CurrentOrder, Ingredient} from '../../types';
import TBurgerConstructorStore from '../../types/stores/TBurgerConstructorStore';
import data from '../../utils/data.json';
import {getIngredient} from '../../utils/helpers';
import {
  addIngredientToOrder,
  moveIngredients,
  removeIngredientFromOrder,
  setNumber,
} from '../actions/burgerConstructor';
import * as TYPES from '../constants';
import {burgerConstructor} from './burgerConstructor'

const ingredients = data as Ingredient[];

const createOrder = (size: number): CurrentOrder => {
  const bun = ingredients.find(item => item.type === Types.BUN)!;
  const main = ingredients.filter(item => item.type !== Types.BUN).slice(0, size);
  return {
    ingredients: [
      getIngredient(bun, 'top'),
      ...main.map(item => getIngredient(item)),
      getIngredient(bun, 'bottom'),
    ],
  }
}

describe('burgerConstructor reducer', () => {
  it('should return the initial state', () => {
    // @ts-ignore
    expect(burgerConstructor(undefined, {}))
      .toEqual({currentOrder: null});
  });

  it(`should handle ${TYPES.RESET_CURRENT_ORDER}`, () => {
    expect(burgerConstructor(undefined, {type: TYPES.RESET_CURRENT_ORDER}))
      .toEqual({currentOrder: null});
  });

  it(`should handle ${TYPES.ADD_INGREDIENT_TO_ORDER}`, () => {
    // добавление верхней булки
    const topBun = ingredients.find(item => item.type === Types.BUN)!;
    let action = addIngredientToOrder(topBun, 'top');
    let state: TBurgerConstructorStore = {
      currentOrder: null,
    };
    let expectedState: TBurgerConstructorStore = {
      currentOrder: {
        ingredients: [action.value],
      },
    };
    expect(burgerConstructor(state, action)).toEqual(expectedState);
    state = {...expectedState};

    // замена верхней булки
    const newTopBun = ingredients.find(item => item.type === Types.BUN && item._id !== topBun._id)!;
    action = addIngredientToOrder(newTopBun, 'top');
    expectedState.currentOrder = {ingredients: [action.value]};
    expect(burgerConstructor(state, action)).toEqual(expectedState);
    state = {...expectedState};

    // добавление другого ингредиента
    const middle = ingredients.find(item => item.type !== Types.BUN)!;
    action = addIngredientToOrder(middle);
    expectedState.currentOrder.ingredients.push(action.value)
    expect(burgerConstructor(state, action)).toEqual(expectedState);
  });

  it(`should handle ${TYPES.REMOVE_INGREDIENT_FROM_ORDER}`, () => {
    // удаление ингредиента из пустого заказа
    let state: TBurgerConstructorStore = {
      currentOrder: null,
    };

    expect(burgerConstructor(state, removeIngredientFromOrder('some-unique-id'))).toEqual(state);

    // удаление ингредиента
    state.currentOrder = createOrder(1);
    const id = state.currentOrder.ingredients[1].uniqueId;
    const expectedState: TBurgerConstructorStore = {
      currentOrder: {
        ingredients: state.currentOrder.ingredients.filter(item => item.uniqueId !== id),
      },
    };

    expect(burgerConstructor(state, removeIngredientFromOrder(id))).toEqual(expectedState);
  });

  it(`should handle ${TYPES.MOVE_INGREDIENTS}`, () => {
    const action = moveIngredients(1, 2);
    let state: TBurgerConstructorStore = {
      currentOrder: null,
    };

    // перемещение в пустом заказе
    expect(burgerConstructor(state, action)).toEqual(state);

    // перемещение ингредиентов
    state.currentOrder = createOrder(3);
    const expectedState = {...state};

    const {dragIndex, hoverIndex} = action;
    const ingredients = [...state.currentOrder.ingredients];
    const dragIngredient = ingredients[dragIndex];

    ingredients.splice(dragIndex, 1);
    ingredients.splice(hoverIndex, 0, dragIngredient);
    expectedState.currentOrder = {ingredients};

    expect(burgerConstructor(state, action)).toEqual(expectedState);
  });

  it(`should handle ${TYPES.SET_NUMBER}`, () => {
    const state: TBurgerConstructorStore = {
      currentOrder: null,
    };
    const action = setNumber(1);

    expect(burgerConstructor(state, action)).toEqual({
      ...state,
      number: action.number,
    })
  });
});
