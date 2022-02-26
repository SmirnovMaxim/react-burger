import {Reducer} from 'redux';
import {TDetailModalStore} from '../../types/stores';
import {TDetailModalActions} from '../actions/detailModal';
import {RESET_INGREDIENT, SET_INGREDIENT, TOGGLE_MODAL} from '../constants';

const initialState: TDetailModalStore = {
  showModal: false,
  ingredient: null,
}

export const detailModal: Reducer<TDetailModalStore, TDetailModalActions> = (state = initialState, action): TDetailModalStore => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {...state, showModal: action.value};
    case SET_INGREDIENT:
      return {...state, ingredient: action.ingredient};
    case RESET_INGREDIENT:
      return {...state, ingredient: null};
    default:
      return state;
  }
}
