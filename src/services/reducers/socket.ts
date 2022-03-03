import {Reducer} from 'redux';
import {TSocketStore} from '../../types/stores';
import {TSocketActions} from '../actions/socket';
import {SOCKET_CLOSE, SOCKET_OPEN} from '../constants';

const initialState: TSocketStore = {
  isConnected: false,
}

export const socketReducer: Reducer<TSocketStore, TSocketActions> = (state, action): TSocketStore => {
  switch (action.type) {
    case SOCKET_OPEN:
      return { isConnected: true };
    case SOCKET_CLOSE:
      return { isConnected: false };
    default:
      return initialState;
  }
}
