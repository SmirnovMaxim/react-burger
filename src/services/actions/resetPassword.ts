import {API} from '../../config/params';
import {TConfirmRestorePasswordForm} from '../../types/forms';
import {AppDispatch, AppThunk} from '../../types/stores/TRootStore';
import {
  CONFIRM_PASSWORD_RESET_ERROR,
  CONFIRM_PASSWORD_RESET_REQUEST,
  CONFIRM_PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
} from '../constants';
import {setError} from './app';

export interface IConfirmPasswordResetErrorAction {
  readonly type: typeof CONFIRM_PASSWORD_RESET_ERROR;
}

export interface IConfirmPasswordResetRequestAction {
  readonly type: typeof CONFIRM_PASSWORD_RESET_REQUEST;
}

export interface IConfirmPasswordResetSuccessAction {
  readonly type: typeof CONFIRM_PASSWORD_RESET_SUCCESS;
}

export interface IPasswordResetErrorAction {
  readonly type: typeof PASSWORD_RESET_ERROR;
}

export interface IPasswordResetRequestAction {
  readonly type: typeof PASSWORD_RESET_REQUEST;
}

export interface IPasswordResetSuccessAction {
  readonly type: typeof PASSWORD_RESET_SUCCESS;
}

export type TResetPasswordActions =
  IConfirmPasswordResetErrorAction
  | IConfirmPasswordResetRequestAction
  | IConfirmPasswordResetSuccessAction
  | IPasswordResetErrorAction
  | IPasswordResetRequestAction
  | IPasswordResetSuccessAction;

export const resetPassword: AppThunk = (email: string) => {
  return async (dispatch: AppDispatch) => {
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
        dispatch(setError(e.message));
      }
    }
  }
}

export const confirmResetPassword: AppThunk = (form: TConfirmRestorePasswordForm) => {
  return async (dispatch: AppDispatch) => {
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
        dispatch(setError(e.message));
      }
    }
  }
}
