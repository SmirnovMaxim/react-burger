import dayjs from 'dayjs';
// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import {Types} from '../enums';
import {ConstructorItem, Ingredient} from '../types';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import 'dayjs/locale/ru';

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(relativeTime);
dayjs.locale('ru');

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

const formatDate = (date: string): string => {
  const dayjsDate = dayjs(date);
  const zone = dayjsDate.format('Z')
    .split(':')[0]
    .replace('0', '');

  let result = `${dayjsDate.format('HH:mm')} i-GMT${zone}`;

  if (dayjsDate.isToday()) {
    return `Сегодня, ${result}`;
  } else if (dayjsDate.isYesterday()) {
    return `Вчера, ${result}`;
  }

  return `${dayjsDate.fromNow()}, ${result}`;
}

export {
  getIngredient,
  setCookie,
  getCookie,
  deleteCookie,
  formatDate,
};
