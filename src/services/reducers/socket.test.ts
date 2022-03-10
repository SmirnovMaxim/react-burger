import {TSocketStore} from '../../types/stores';
import * as TYPES from '../constants';
import {socketReducer} from './socket';

describe(`socket reducer`, () => {
  it('should return initial state', () => {
    const state: TSocketStore = {
      isConnected: false,
    };

    // @ts-ignore
    expect(socketReducer(undefined, {})).toEqual(state);
  });

  it(`should handle ${TYPES.SOCKET_OPEN} and ${TYPES.SOCKET_CLOSE}`, () => {
    let state: TSocketStore = {
      isConnected: false,
    };
    let expectedState: TSocketStore = {
      isConnected: true,
    }

    expect(socketReducer(state, {type: TYPES.SOCKET_OPEN})).toEqual(expectedState);

    state = {...expectedState};
    expect(socketReducer(state, {type: TYPES.SOCKET_CLOSE})).toEqual({
      isConnected: false,
    });
  });
});
