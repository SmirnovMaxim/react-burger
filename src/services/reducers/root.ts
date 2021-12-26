import {combineReducers} from 'redux';
import {TRootStore} from '../../types/stores';
import {app} from './app';
import {order} from './order';

export const rootReducer = combineReducers<TRootStore>({
  app,
  order,
});
