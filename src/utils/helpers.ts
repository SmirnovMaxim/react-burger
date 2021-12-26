// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import {Types} from '../enums';
import {ConstructorItem as ConstructorItemType, Ingredient} from '../types';

const shuffle = <T extends any[]>(arr: T) => {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getRandomNumber = (limit: number) => Math.round(Math.random() * limit);

const getIngredient = (item: Ingredient, position?: 'top' | 'bottom'): ConstructorItemType => {
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

export {
  shuffle,
  getRandomNumber,
  getIngredient,
};
