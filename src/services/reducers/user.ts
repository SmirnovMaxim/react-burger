import {CombinedState} from 'redux';
import {TUserStore} from '../../types/stores';
import {deleteCookie, setAccessToken} from '../../utils/helpers';
import {LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGNUP_SUCCESS, TOKEN_SUCCESS} from '../actions/auth';
import {FETCH_USER_SUCCESS, UPDATE_USER_SUCCESS} from '../actions/user';

const initialState: TUserStore = {
  email: '',
  name: '',
  password: '',
}

export const user = (state: CombinedState<TUserStore> = initialState, action: any): TUserStore => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      localStorage.setItem('refreshToken', action.refreshToken);
      setAccessToken(action.accessToken.split(' ')[1]);
      return {...state, ...action.user};
    case TOKEN_SUCCESS:
      localStorage.setItem('refreshToken', action.refreshToken);
      setAccessToken(action.accessToken.split(' ')[1]);
      return state;
    case LOGOUT_SUCCESS:
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      return initialState;
    case FETCH_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {...state, ...action.user};
    case LOGIN_ERROR:
      return initialState;
    default:
      return state;
  }
}
