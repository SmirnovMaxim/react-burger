import {SOCKET_CLOSE, SOCKET_CREATE, SOCKET_DATA, SOCKET_ERROR, SOCKET_OPEN} from '../constants';

export interface ISocketCreateAction {
  readonly type: typeof SOCKET_CREATE;
  readonly action: string;
  readonly path: string;
}

export interface ISocketCloseAction {
  readonly type: typeof SOCKET_CLOSE;
}

export interface ISocketDataAction {
  readonly type: typeof SOCKET_DATA;
  readonly data: object;
}

export interface ISocketErrorAction {
  readonly type: typeof SOCKET_ERROR;
}

export interface ISocketOpenAction {
  readonly type: typeof SOCKET_OPEN;
}

export type TSocketActions =
  ISocketCloseAction
  | ISocketCreateAction
  | ISocketDataAction
  | ISocketErrorAction
  | ISocketOpenAction;

export const socketData = (data: object): ISocketDataAction => ({
  type: SOCKET_DATA,
  data,
});

export const socketCreate = (action: string, path: string): ISocketCreateAction => ({
  type: SOCKET_CREATE,
  action,
  path,
});
