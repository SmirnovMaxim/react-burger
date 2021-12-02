import React, {useMemo} from 'react';
import {Ingredient as IngredientType} from '../../../types';
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from './ingredient.module.css';
import {getRandomNumber} from "../../../utils/helpers";

function Ingredient(props: IngredientType) {
  let counter = useMemo(() => getRandomNumber(3), []);

  return (
    <div className={`text text_type_main-default text-center p-4 ${Styles.ingredient}`}>
      {counter > 0 && <Counter count={counter}/>}
      <img src={props.image} alt={props.name}/>
      <div>
        <span className={`${Styles.price} mr-3`}>{props.price}</span>
        <CurrencyIcon type="primary"/>
      </div>
      <div>{props.name}</div>
    </div>
  )
}

export default Ingredient;
