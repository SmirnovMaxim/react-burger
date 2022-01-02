import {combineReducers} from 'redux';
import {TRootStore} from '../../types/stores';
import {app} from './app';
import {burgerConstructor} from './burgerConstructor';
import {detailModal} from './detailModal';
import {order} from './order';

export const rootReducer = combineReducers<TRootStore>({
  app,
  burgerConstructor,
  detailModal,
  order,
});
