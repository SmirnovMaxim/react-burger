import React, {memo, useState} from 'react';
import {Ingredient as IngredientType} from '../../../types';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from './ingredient.module.css';
import {getRandomNumber} from "../../../utils/helpers";
import IngredientDetails from "./ingredient-details/ingredient-details";

const Ingredient = memo((props: IngredientType) => {
  const counter = getRandomNumber(3);
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className={`text text_type_main-default p-4 ${Styles.ingredient}`} onClick={() => setShowModal(true)}>
        {counter > 0 && <Counter count={counter}/>}
        <img src={props.image} alt={props.name}/>
        <div>
          <span className={`${Styles.price} mr-3`}>{props.price}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <div>{props.name}</div>
      </div>
      {showModal && <IngredientDetails ingredient={props} onClose={() => setShowModal(false)}/>}
    </>
  )
})

export default Ingredient;
