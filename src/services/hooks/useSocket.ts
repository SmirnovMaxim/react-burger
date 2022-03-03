import {useEffect, useRef} from 'react';
import {WS_API} from '../../config/params';
import {SOCKET_CLOSE, SOCKET_OPEN} from '../constants';
import {useDispatch} from '../hooks';

export const useSocket = <TypeAction, TypeReturnAction>(endpoint: string, action: (data: TypeAction) => TypeReturnAction) => {
  const socket = useRef<WebSocket>();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = new WebSocket(`${WS_API}${endpoint}`);

    return () => {
      socket.current?.close();
    }
  }, [endpoint]);

  useEffect(() => {
    if (!socket.current) {
      return;
    }

    socket.current.addEventListener('close', () => {
      dispatch({type: SOCKET_CLOSE});
    });
    socket.current.addEventListener('open', () => {
      dispatch({type: SOCKET_OPEN});
    });
    socket.current.addEventListener('message', ({data}) => {
      dispatch(action(JSON.parse(data)));
    });
  }, [socket, dispatch, action]);
}
