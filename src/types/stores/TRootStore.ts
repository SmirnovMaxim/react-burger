import {Action, ActionCreator} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {TAppActions} from '../../services/actions/app';
import {TBurgerConstructorActions} from '../../services/actions/burgerConstructor';
import {TDetailModalActions} from '../../services/actions/detailModal';
import {TOrderActions} from '../../services/actions/order';
import {TOrderHistoryActions} from '../../services/actions/orderHistory';
import {TResetPasswordActions} from '../../services/actions/resetPassword';
import {TSocketActions} from '../../services/actions/socket';
import {TUserActions} from '../../services/actions/user';
import {store} from '../../services/reducers';

export type TApplicationActions = TAppActions
  | TBurgerConstructorActions
  | TDetailModalActions
  | TOrderActions
  | TOrderHistoryActions
  | TResetPasswordActions
  | TSocketActions
  | TUserActions;

export type TRootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, TRootStore, TApplicationActions>>;
