import {Reducer} from 'redux';
import {TUserStore} from '../../types/stores';
import {TUserActions} from '../actions/user';
import {
  FETCH_USER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  UPDATE_USER_SUCCESS,
} from '../constants';

const initialState: TUserStore = {
  email: '',
  name: '',
  password: '',
}

export const user: Reducer<TUserStore, TUserActions> = (state = initialState, action): TUserStore => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case FETCH_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {...state, ...action.user};
    case LOGIN_ERROR:
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
