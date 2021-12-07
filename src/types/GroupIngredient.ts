import {Types} from "../enums";
import Ingredient from "./Ingredient";

type GroupIngredient = {
  name: string;
  type: Types;
  items: Ingredient[];
}

export default GroupIngredient;
