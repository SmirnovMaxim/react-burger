import {API} from '../../config/params';
import {Ingredient} from '../../types';
import {AppDispatch, AppThunk} from '../../types/stores/TRootStore';
import {
  FETCH_INGREDIENTS_ERROR,
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  RESET_ERROR,
  SET_ERROR,
} from '../constants';

export interface ISetErrorAction {
  readonly type: typeof SET_ERROR;
  readonly error: string;
}

export interface IFetchIngredientsRequestAction {
  readonly type: typeof FETCH_INGREDIENTS_REQUEST;
}

export interface IFetchIngredientsSuccessAction {
  readonly type: typeof FETCH_INGREDIENTS_SUCCESS;
  readonly ingredients: Ingredient[];
}

export interface IFetchIngredientsErrorAction {
  readonly type: typeof FETCH_INGREDIENTS_ERROR;
}

export interface IResetErrorAction {
  readonly type: typeof RESET_ERROR;
}

export type TAppActions =
  ISetErrorAction
  | IFetchIngredientsSuccessAction
  | IFetchIngredientsErrorAction
  | IFetchIngredientsRequestAction
  | IResetErrorAction;

export const setError = (error: string): ISetErrorAction => ({
  type: SET_ERROR,
  error,
});

export const fetchIngredientsSuccess = (ingredients: Ingredient[]): IFetchIngredientsSuccessAction => ({
  type: FETCH_INGREDIENTS_SUCCESS,
  ingredients,
})

export const getIngredients: AppThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({type: FETCH_INGREDIENTS_REQUEST});
      const response = await fetch(`${API}ingredients`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const {success, data} = await response.json();
      if (!success) {
        throw new Error('Failed parse data');
      }
      dispatch(fetchIngredientsSuccess(data));
    } catch (e) {
      dispatch({type: FETCH_INGREDIENTS_ERROR});
      if (e instanceof Error) {
        dispatch(setError(e.message));
      }
    }
  }
}

