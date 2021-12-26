import ConstructorItem from './ConstructorItem';

export type CurrentOrder = {
  ingredients: ConstructorItem[];
};

export type Order = CurrentOrder & {
  number: number;
}
