import {API} from '../../config/params';
import {TLoginForm, TSignupForm} from '../../types/forms';
import {TLoginResponse, TUserResponse} from '../../types/responses';
import {TUserStore} from '../../types/stores';
import {AppDispatch, AppThunk} from '../../types/stores/TRootStore';
import {removeTokens, setTokens, updateToken} from '../../utils/auth';
import {getCookie} from '../../utils/helpers';
import {
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from '../constants';
import {setError} from './app';

export interface ILoginErrorAction {
  readonly type: typeof LOGIN_ERROR;
}

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user: TUserStore;
}

export interface ILogoutErrorAction {
  readonly type: typeof LOGOUT_ERROR;
}

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ISignupErrorAction {
  readonly type: typeof SIGNUP_ERROR;
}

export interface ISignupRequestAction {
  readonly type: typeof SIGNUP_REQUEST;
}

export interface ISignupSuccessAction {
  readonly type: typeof SIGNUP_SUCCESS;
  readonly user: TUserStore;
}

export interface IFetchUserRequestAction {
  readonly type: typeof FETCH_USER_REQUEST;
}

export interface IFetchUserSuccessAction {
  readonly type: typeof FETCH_USER_SUCCESS;
  readonly user: TUserStore;
}

export interface IFetchUserErrorAction {
  readonly type: typeof FETCH_USER_ERROR;
}

export interface IUpdateUserErrorAction {
  readonly type: typeof UPDATE_USER_ERROR;
}

export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: TUserStore;
}

export type TUserActions =
  ILoginErrorAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILogoutErrorAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ISignupErrorAction
  | ISignupRequestAction
  | ISignupSuccessAction
  | IFetchUserRequestAction
  | IFetchUserSuccessAction
  | IFetchUserErrorAction
  | IUpdateUserSuccessAction
  | IUpdateUserErrorAction
  | IUpdateUserRequestAction;

type TUser = Omit<TUserStore, 'password'>;

export const loginSuccess = (user: TUserStore): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  user,
});

export const signupSuccess = (user: TUserStore): ISignupSuccessAction => ({
  type: SIGNUP_SUCCESS,
  user,
});

export const fetchUserSuccess = (user: TUser): IFetchUserSuccessAction => ({
  type: FETCH_USER_SUCCESS,
  user: {
    ...user,
    password: '',
  },
});

export const updateUserSuccess = (user: TUser): IUpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  user: {
    ...user,
    password: '',
  },
});

export const fetchUser: AppThunk = () => {
  return async (dispatch: AppDispatch) => {
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

      dispatch(fetchUserSuccess(user));
    } catch (e) {
      dispatch({type: FETCH_USER_ERROR});
      if (e instanceof Error) {
        dispatch(setError(e.message));
      }
    }
  }
}
export const updateUser: AppThunk = (form: TUserStore) => {
  return async (dispatch: AppDispatch) => {
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

      dispatch(updateUserSuccess(user));
    } catch (e) {
      dispatch({type: UPDATE_USER_ERROR});
      if (e instanceof Error) {
        dispatch(setError(e.message));
      }
    }
  }
}
export const login: AppThunk = (form: TLoginForm) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({type: LOGIN_REQUEST});
      const response = await fetch(`${API}auth/login`, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }
      const {success, user, accessToken, refreshToken} = await response.json() as TLoginResponse;

      if (!success) {
        throw new Error('Failed login');
      }

      setTokens(accessToken, refreshToken);
      dispatch(loginSuccess(user));
    } catch (e) {
      dispatch({type: LOGIN_ERROR});
      if (e instanceof Error) {
        dispatch(setError(e.message));
      }
    }
  }
}
export const logout: AppThunk = (token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({type: LOGOUT_REQUEST});
      const response = await fetch(`${API}auth/logout`, {
        method: 'POST',
        body: JSON.stringify({token}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }
      const {success} = await response.json() as TLoginResponse;

      if (!success) {
        throw new Error('Failed logout');
      }

      removeTokens();
      dispatch({type: LOGOUT_SUCCESS});
    } catch (e) {
      dispatch({type: LOGOUT_ERROR});
      if (e instanceof Error) {
        dispatch(setError(e.message));
      }
    }
  }
}
export const signup: AppThunk = (form: TSignupForm) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({type: SIGNUP_REQUEST});
      const response = await fetch(`${API}auth/register`, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }
      const {success, user, refreshToken, accessToken} = await response.json() as TLoginResponse;
      if (!success) {
        throw new Error('Failed signup');
      }
      setTokens(accessToken, refreshToken);
      dispatch(signupSuccess(user));
    } catch (e) {
      dispatch({type: SIGNUP_ERROR});
      if (e instanceof Error) {
        dispatch(setError(e.message));
      }
    }
  }
}
