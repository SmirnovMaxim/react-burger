import {TUserStore} from '../../types/stores';
import {fetchUserSuccess, loginSuccess, signupSuccess} from '../actions/user';
import * as TYPES from '../constants';
import {user} from './user';

describe(`user reducer`, () => {
  it('should return initial state', () => {
    const state: TUserStore = {
      email: '',
      name: '',
      password: '',
    };

    // @ts-ignore
    expect(user(undefined, {})).toEqual(state);
  });

  it(`should handle ${TYPES.LOGIN_SUCCESS}, ${TYPES.SIGNUP_SUCCESS}, ${TYPES.FETCH_USER_SUCCESS}, ${TYPES.UPDATE_USER_SUCCESS}`, () => {
    const state: TUserStore = {
      email: '',
      name: '',
      password: '',
    };

    const userData: TUserStore = {
      password: 'password',
      name: 'John',
      email: 'john@test.com',
    };

    const loginSuccessAction = loginSuccess(userData);
    expect(user(state, loginSuccessAction)).toEqual(loginSuccessAction.user);

    const signupSuccessAction = signupSuccess(userData);
    expect(user(state, signupSuccessAction)).toEqual(signupSuccessAction.user);

    const fetchUserAction = fetchUserSuccess(userData);
    expect(user(state, fetchUserAction)).toEqual(fetchUserAction.user);
  });

  it(`should handle ${TYPES.LOGIN_ERROR}, ${TYPES.LOGOUT_SUCCESS}`, () => {
    const state: TUserStore = {
      password: 'password',
      name: 'John',
      email: 'john@test.com',
    };
    const expectedState: TUserStore = {
      email: '',
      name: '',
      password: '',
    };

    expect(user(state, {type: TYPES.LOGIN_ERROR})).toEqual(expectedState);
    expect(user(state, {type: TYPES.LOGOUT_SUCCESS})).toEqual(expectedState);
  });
});
