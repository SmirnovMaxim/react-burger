import {Ingredient} from '../../types';
import {TAppStore} from '../../types/stores';
import data from '../../utils/data.json';
import {fetchIngredientsSuccess, setError} from '../actions/app';
import * as TYPES from '../constants';
import {app} from './app'

const ingredients = data as Ingredient[];

describe('app reducer', () => {
  it('should return the initial state', () => {
    // @ts-ignore
    expect(app(undefined, {}))
      .toEqual({
        error: null,
        ingredients: [],
      })
  })

  it(`should handle ${TYPES.SET_ERROR}`, () => {
    let state: TAppStore = {
      error: null,
      ingredients: [],
    };
    let action = setError('Some error');
    const expectedState: TAppStore = {
      error: action.error,
      ingredients: [],
    };
    expect(app(state, action)).toEqual(expectedState)

    state = {...expectedState};
    action = setError('Another error')
    expectedState.error = action.error;
    expect(app(state, action)).toEqual(expectedState)
  })

  it(`should handle ${TYPES.FETCH_INGREDIENTS_SUCCESS}`, () => {
    const state: TAppStore = {
      error: 'Some error',
      ingredients: [],
    };
    const action = fetchIngredientsSuccess(ingredients);

    expect(app(state, action)).toEqual({
      error: 'Some error',
      ingredients,
    })
  });

  it(`should handle ${TYPES.FETCH_INGREDIENTS_ERROR}`, () => {
    const state = {
      error: 'Some error',
      ingredients,
    };
    expect(app(state, {type: TYPES.FETCH_INGREDIENTS_ERROR}))
      .toEqual({
        error: null,
        ingredients: [],
      });
  });

  it(`should handle ${TYPES.RESET_ERROR}`, () => {
    const state = {
      error: 'Some error',
      ingredients,
    };
    expect(app(state, {type: TYPES.RESET_ERROR}))
      .toEqual({
        error: null,
        ingredients,
      });
  });
})
