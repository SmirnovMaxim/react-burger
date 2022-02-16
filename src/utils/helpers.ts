// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import {API} from '../config/params';
import {Types} from '../enums';
import {ConstructorItem, Ingredient} from '../types';
import {TTokenResponse} from '../types/responses';

const getIngredient = (item: Ingredient, position?: 'top' | 'bottom'): ConstructorItem => {
  let text: string;

  switch (position) {
    case 'top':
      text = `${item.name} (верх)`;
      break;
    case 'bottom':
      text = `${item.name} (низ)`;
      break;
    default:
      text = item.name;
  }

  return {
    id: item._id,
    uniqueId: uuidv4(),
    type: item.type,
    position,
    text,
    isLocked: item.type === Types.BUN,
    price: item.price,
    thumbnail: item.image,
  }
};

const setCookie = (name: string, value: string, options: { [p: string]: any } = {}): void => {
  options = {
    path: '/',
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

const deleteCookie = (name: string): void => {
  setCookie(name, '', {'max-age': -1});
}

const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const setAccessToken = (token: string): void => {
  setCookie('accessToken', token, {'max-age': 1200});
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

  localStorage.setItem('refreshToken', refreshToken);
  setAccessToken(accessToken.split(' ')[1]);
}

export {
  getIngredient,
  setAccessToken,
  setCookie,
  getCookie,
  deleteCookie,
  updateToken,
};
