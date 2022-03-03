import {Reducer} from 'redux';
import {TResetPasswordStore} from '../../types/stores';
import {TResetPasswordActions} from '../actions/resetPassword';
import {
  CONFIRM_PASSWORD_RESET_ERROR,
  CONFIRM_PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,
  PASSWORD_RESET_SUCCESS,
} from '../constants';

const initialState: TResetPasswordStore = {
  isSendForgotPassword: false,
}

export const resetPassword: Reducer<TResetPasswordStore, TResetPasswordActions> = (state = initialState, action): TResetPasswordStore => {
  switch (action.type) {
    case PASSWORD_RESET_SUCCESS:
      return {...state, isSendForgotPassword: true};
    case CONFIRM_PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_ERROR:
    case CONFIRM_PASSWORD_RESET_ERROR:
      return initialState;
    default:
      return state;
  }
}
