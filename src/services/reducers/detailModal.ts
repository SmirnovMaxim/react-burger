import {CombinedState} from 'redux';
import {TDetailModalStore} from '../../types/stores';
import {RESET_INGREDIENT, SET_INGREDIENT, TOGGLE_MODAL} from '../actions/detailModal';

const initialState: TDetailModalStore = {
  showModal: false,
  ingredient: null,
}

export const detailModal = (state: CombinedState<TDetailModalStore> = initialState, action: any): TDetailModalStore => {
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
