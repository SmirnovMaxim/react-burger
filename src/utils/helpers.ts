import {ConstructorItem as ConstructorItemType, Ingredient} from "../types";
import {Types} from "../enums";

const shuffle = <T extends any[]>(arr: T) => {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getRandomNumber = (limit: number) => Math.round(Math.random() * limit);

const getIngredient = (item: Ingredient, type: 'top' | 'bottom'): ConstructorItemType => {
  const text = type === 'top' ? `${item.name} (верх)` : `${item.name} (низ)`;

  return {
    id: item._id,
    type,
    text,
    isLocked: true,
    price: item.price,
    thumbnail: item.image,
  }
};

const getRandomBun = (data: Ingredient[]): Ingredient => {
  const buns = data.filter((item: Ingredient) => item.type === Types.BUN);
  return buns[getRandomNumber(buns.length - 1)];
};

export {
  shuffle,
  getRandomNumber,
  getIngredient,
  getRandomBun,
};
