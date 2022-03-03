import {Ingredient} from '../../types';
import {RESET_INGREDIENT, SET_INGREDIENT, TOGGLE_MODAL} from '../constants';

export interface IResetIngredientAction {
  readonly type: typeof RESET_INGREDIENT;
}

export interface ISetIngredientAction {
  readonly type: typeof SET_INGREDIENT;
  readonly ingredient: Ingredient;
}

export interface IToggleModalAction {
  readonly type: typeof TOGGLE_MODAL;
  readonly value: boolean;
}

export type TDetailModalActions =
  IResetIngredientAction
  | ISetIngredientAction
  | IToggleModalAction;

export const toggleModal = (value: boolean): IToggleModalAction => ({
  type: TOGGLE_MODAL,
  value,
});

export const setIngredient = (ingredient: Ingredient): ISetIngredientAction => ({
  type: SET_INGREDIENT,
  ingredient,
})
