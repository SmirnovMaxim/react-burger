import {Ingredient} from '../../types';
import {TDetailModalStore} from '../../types/stores';
import data from '../../utils/data.json';
import {setIngredient, toggleModal} from '../actions/detailModal';
import * as TYPES from '../constants';
import {RESET_INGREDIENT} from '../constants';
import {detailModal} from './detailModal';

const ingredients = data as Ingredient[];

describe('detailModel reducer', () => {
  it('should return the initial state', () => {
    // @ts-ignore
    expect(detailModal(undefined, {}))
      .toEqual({
        showModal: false,
        ingredient: null,
      });
  });

  it(`should handle ${TYPES.TOGGLE_MODAL}`, () => {
    const state: TDetailModalStore = {
      showModal: false,
      ingredient: null,
    };
    const expectedState: TDetailModalStore = {...state};
    let action = toggleModal(true);

    expectedState.showModal = action.value;
    expect(detailModal(state, action).showModal).toBeTruthy();

    action = toggleModal(false);
    expectedState.showModal = action.value;
    expect(detailModal(state, action).showModal).toBeFalsy();
  });

  it(`should handle ${TYPES.SET_INGREDIENT}`, () => {
    const state: TDetailModalStore = {
      showModal: false,
      ingredient: null,
    };
    const action = setIngredient(ingredients[0]);

    expect(detailModal(state, action)).toEqual({
      showModal: false,
      ingredient: action.ingredient,
    });
  });

  it(`should handle ${TYPES.RESET_INGREDIENT}`, () => {
    const state: TDetailModalStore = {
      showModal: false,
      ingredient: ingredients[0],
    };

    expect(detailModal(state, {type: RESET_INGREDIENT})).toEqual({
      showModal: false,
      ingredient: null,
    });
  });
});
