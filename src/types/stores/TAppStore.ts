import {Ingredient} from '../index';

type TAppStore = {
  error: string | null;
  ingredient: Ingredient | null;
  ingredients: Ingredient[];
};

export default TAppStore;
