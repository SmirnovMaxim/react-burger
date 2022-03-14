import {TResetPasswordStore} from '../../types/stores';
import {resetPassword} from './resetPassword';
import * as TYPES from '../constants';

describe('resetPassword reducer', () => {
  it('should return initial state', () => {
    const expectedState: TResetPasswordStore = {
      isSendForgotPassword: false,
    };
    // @ts-ignore
    expect(resetPassword(undefined, {})).toEqual(expectedState);
  });

  it(`should handle ${TYPES.PASSWORD_RESET_SUCCESS}`, () => {
    const state: TResetPasswordStore = {
      isSendForgotPassword: false,
    };
    expect(resetPassword(state, {type: TYPES.PASSWORD_RESET_SUCCESS}).isSendForgotPassword).toBeTruthy();
  });

  it(`should handle ${TYPES.PASSWORD_RESET_ERROR}, ${TYPES.CONFIRM_PASSWORD_RESET_SUCCESS}, ${TYPES.CONFIRM_PASSWORD_RESET_ERROR}`, () => {
    const state: TResetPasswordStore = {
      isSendForgotPassword: false,
    };
    expect(resetPassword(state, {type: TYPES.PASSWORD_RESET_ERROR})).toEqual(state);
    expect(resetPassword(state, {type: TYPES.CONFIRM_PASSWORD_RESET_ERROR})).toEqual(state);
    expect(resetPassword(state, {type: TYPES.CONFIRM_PASSWORD_RESET_SUCCESS})).toEqual(state);
  });
});
