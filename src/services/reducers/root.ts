import {combineReducers} from 'redux';
import {app} from './app';
import {burgerConstructor} from './burgerConstructor';
import {detailModal} from './detailModal';
import {order} from './order';
import {orderHistory} from './orderHistory';
import {resetPassword} from './resetPassword';
import {socketReducer} from './socket';
import {user} from './user';

export const rootReducer = combineReducers({
  app,
  burgerConstructor,
  detailModal,
  order,
  orderHistory,
  resetPassword,
  socketReducer,
  user,
});
