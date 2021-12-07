import Styles from "./ingredient-group.module.css";
import {Ingredient as IngredientType} from "../../../../types";
import Ingredient from "../ingredient";
import React from "react";
import {GroupIngredient} from "../../../../types";

interface IProps {
  group: GroupIngredient;
}

function IngredientGroup({ group }: IProps) {
  return (
    <>
      <h2 id={group.type}>{group.name}</h2>
      <div className={Styles.ingredients}>
        {group.items.map((ingredient: IngredientType) => (
          <Ingredient key={ingredient._id} {...ingredient}/>
        ))}
      </div>
    </>
  );
}

export default IngredientGroup;
