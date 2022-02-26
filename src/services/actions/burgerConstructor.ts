import {ConstructorItem, Ingredient} from '../../types';
import {getIngredient} from '../../utils/helpers';
import {
  ADD_INGREDIENT_TO_ORDER,
  MOVE_INGREDIENTS,
  REMOVE_INGREDIENT_FROM_ORDER,
  RESET_CURRENT_ORDER,
  SET_NUMBER,
} from '../constants';

export interface IAddIngredientToOrderAction {
  readonly type: typeof ADD_INGREDIENT_TO_ORDER;
  readonly value: ConstructorItem;
}

export interface IMoveIngredientsAction {
  readonly type: typeof MOVE_INGREDIENTS;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export interface IRemoveIngredientFromOrderAction {
  readonly type: typeof REMOVE_INGREDIENT_FROM_ORDER;
  readonly value: string;
}

export interface IResetCurrentOrderAction {
  readonly type: typeof RESET_CURRENT_ORDER;
}

export interface ISetNumberAction {
  readonly type: typeof SET_NUMBER;
  readonly number: number;
}

export type TBurgerConstructorActions =
  IAddIngredientToOrderAction
  | IMoveIngredientsAction
  | IRemoveIngredientFromOrderAction
  | IResetCurrentOrderAction
  | ISetNumberAction;

export const addIngredientToOrder = (item: Ingredient, position?: 'top' | 'bottom' | undefined): IAddIngredientToOrderAction => ({
  type: ADD_INGREDIENT_TO_ORDER,
  value: getIngredient(item, position),
})

export const moveIngredients = (dragIndex: number, hoverIndex: number): IMoveIngredientsAction => ({
  type: MOVE_INGREDIENTS,
  dragIndex,
  hoverIndex,
});

export const removeIngredientFromOrder = (value: string): IRemoveIngredientFromOrderAction => ({
  type: REMOVE_INGREDIENT_FROM_ORDER,
  value,
});

export const setNumber = (number: number): ISetNumberAction => ({
  type: SET_NUMBER,
  number,
});
