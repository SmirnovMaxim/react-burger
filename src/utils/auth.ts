import {API} from '../config/params';
import {TTokenResponse} from '../types/responses';
import {deleteCookie, setCookie} from './helpers';

const setAccessToken = (token: string): void => {
  setCookie('accessToken', token, {'max-age': 1200});
}

const setTokens = (access: string, refresh: string): void => {
  localStorage.setItem('refreshToken', refresh);
  setCookie('accessToken', access.split(' ')[1], {'max-age': 1200});
}

const removeTokens = (): void => {
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
}

const updateToken = async (token: string): Promise<void> => {
  const response = await fetch(`${API}auth/token`, {
    method: 'POST',
    body: JSON.stringify({token}),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    return;
  }
  const {success, refreshToken, accessToken} = await response.json() as TTokenResponse;
  if (!success) {
    throw new Error('Failed updating token');
  }

  setTokens(accessToken, refreshToken);
}
export {
  removeTokens,
  setAccessToken,
  setTokens,
  updateToken
};
