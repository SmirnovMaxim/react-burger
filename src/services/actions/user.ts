import {Dispatch} from 'redux';
import {API} from '../../config/params';
import {TUserResponse} from '../../types/responses';
import {TUserStore} from '../../types/stores';
import {getCookie, updateToken} from '../../utils/helpers';
import {SET_ERROR} from './app';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export const fetchUser = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch({type: FETCH_USER_REQUEST});
      let token = getCookie('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (!token) {
        if (refreshToken) {
          await updateToken(refreshToken);
          token = getCookie('accessToken');
        } else {
          return;
        }
      }
      const response = await fetch(`${API}auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const {success, user} = await response.json() as TUserResponse;

      if (!success) {
        throw new Error('Failed fetching user data');
      }

      dispatch({type: FETCH_USER_SUCCESS, user});
    } catch (e) {
      dispatch({type: FETCH_USER_ERROR});
      if (e instanceof Error) {
        dispatch({type: SET_ERROR, error: e.message});
      }
    }
  }
}

export const updateUser = (form: TUserStore) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch({type: UPDATE_USER_REQUEST});
      let token = getCookie('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (!token && refreshToken) {
        await updateToken(refreshToken);
        token = getCookie('accessToken');
      }
      const response = await fetch(`${API}auth/user`, {
        method: 'PATCH',
        body: JSON.stringify(form),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }
      const {success, user} = await response.json() as TUserResponse;

      if (!success) {
        throw new Error('Failed updating user data');
      }

      dispatch({type: UPDATE_USER_SUCCESS, user});
    } catch (e) {
      dispatch({type: UPDATE_USER_ERROR});
      if (e instanceof Error) {
        dispatch({type: SET_ERROR, error: e.message});
      }
    }
  }
}
