import {Dispatch} from 'redux';
import {API} from '../../config/params';
import {TConfirmRestorePasswordForm, TLoginForm, TSignupForm} from '../../types/forms';
import {TLoginResponse} from '../../types/responses';
import {SET_ERROR} from './app';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';

export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_ERROR = 'PASSWORD_RESET_ERROR';

export const CONFIRM_PASSWORD_RESET_REQUEST = 'CONFIRM_PASSWORD_RESET_REQUEST';
export const CONFIRM_PASSWORD_RESET_SUCCESS = 'CONFIRM_PASSWORD_RESET_SUCCESS';
export const CONFIRM_PASSWORD_RESET_ERROR = 'CONFIRM_PASSWORD_RESET_ERROR';

export const login = (form: TLoginForm) => {
  return async (dispatch: Dispatch<any>) => {
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

      dispatch({
        type: LOGIN_SUCCESS,
        user,
        accessToken,
        refreshToken,
      });
    } catch (e) {
      dispatch({type: LOGIN_ERROR});
      if (e instanceof Error) {
        dispatch({type: SET_ERROR, error: e.message});
      }
    }
  }
}

export const logout = (token: string) => {
  return async (dispatch: Dispatch<any>) => {
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

      dispatch({type: LOGOUT_SUCCESS});
    } catch (e) {
      dispatch({type: LOGOUT_ERROR});
      if (e instanceof Error) {
        dispatch({type: SET_ERROR, error: e.message});
      }
    }
  }
}

export const signup = (form: TSignupForm) => {
  return async (dispatch: Dispatch<any>) => {
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
      dispatch({
        type: SIGNUP_SUCCESS,
        user,
        accessToken,
        refreshToken,
      });
    } catch (e) {
      dispatch({type: SIGNUP_ERROR});
      if (e instanceof Error) {
        dispatch({type: SET_ERROR, error: e.message});
      }
    }
  }
}

export const resetPassword = (email: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch({type: PASSWORD_RESET_REQUEST});
      const response = await fetch(`${API}password-reset`, {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const {success} = await response.json();
      if (!success) {
        throw new Error('Failed parse data');
      }
      dispatch({type: PASSWORD_RESET_SUCCESS});
    } catch (e) {
      dispatch({type: PASSWORD_RESET_ERROR});
      if (e instanceof Error) {
        dispatch({type: SET_ERROR, error: e.message});
      }
    }
  }
}

export const confirmResetPassword = (form: TConfirmRestorePasswordForm) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch({type: CONFIRM_PASSWORD_RESET_REQUEST});
      const response = await fetch(`${API}password-reset/reset`, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const {success} = await response.json();
      if (!success) {
        throw new Error('Failed parse data');
      }

      dispatch({type: CONFIRM_PASSWORD_RESET_SUCCESS});
    } catch (e) {
      dispatch({type: CONFIRM_PASSWORD_RESET_ERROR});
      if (e instanceof Error) {
        dispatch({type: SET_ERROR, error: e.message});
      }
    }
  }
}
