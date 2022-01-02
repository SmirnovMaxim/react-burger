// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import {Types} from '../enums';
import {ConstructorItem, Ingredient} from '../types';

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

export {
  getIngredient,
};
