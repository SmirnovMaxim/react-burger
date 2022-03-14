import Styles from "./ingredient-group.module.css";
import {Ingredient as IngredientType} from "../../../../types";
import Ingredient from "../ingredient";
import React, {FC} from 'react';
import {GroupIngredient} from "../../../../types";

interface IProps {
  group: GroupIngredient;
}

const IngredientGroup: FC<IProps> = ({ group }) => {
  return (
    <>
      <h2 id={group.type}>{group.name}</h2>
      <div className={Styles.ingredients} data-test-id="ingredientGroup">
        {group.items.map((ingredient: IngredientType) => (
          <Ingredient key={ingredient._id} {...ingredient}/>
        ))}
      </div>
    </>
  );
}

export default IngredientGroup;
