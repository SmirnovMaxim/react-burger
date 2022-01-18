import {Dispatch} from 'redux';
import {API} from '../../config/params';
import {TConfirmRestorePasswordForm} from '../../types/forms';
import {SET_ERROR} from './app';

export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_ERROR = 'PASSWORD_RESET_ERROR';

export const CONFIRM_PASSWORD_RESET_REQUEST = 'CONFIRM_PASSWORD_RESET_REQUEST';
export const CONFIRM_PASSWORD_RESET_SUCCESS = 'CONFIRM_PASSWORD_RESET_SUCCESS';
export const CONFIRM_PASSWORD_RESET_ERROR = 'CONFIRM_PASSWORD_RESET_ERROR';

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
