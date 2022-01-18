import {CombinedState} from 'redux';
import {TResetPasswordStore} from '../../types/stores';
import {
  CONFIRM_PASSWORD_RESET_ERROR,
  CONFIRM_PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,
  PASSWORD_RESET_SUCCESS,
} from '../actions/resetPassword';

const initialState: TResetPasswordStore = {
  isSendForgotPassword: false,
}

export const resetPassword = (state: CombinedState<TResetPasswordStore> = initialState, action: any): TResetPasswordStore => {
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
