import React, {memo, useContext, useMemo} from 'react';
import {Ingredient as IngredientType} from '../../../types';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from './ingredient.module.css';
import {getRandomNumber} from "../../../utils/helpers";
import {ModalIngredientContext} from "../../../contexts";

const Ingredient = memo((props: IngredientType) => {
  const counter = useMemo(() => getRandomNumber(3), []);
  const onShowModal = useContext(ModalIngredientContext);

  return (
    <>
      <div className={`text text_type_main-default p-4 ${Styles.ingredient}`} onClick={() => onShowModal(props)}>
        {counter > 0 && <Counter count={counter}/>}
        <img src={props.image} alt={props.name}/>
        <div>
          <span className={`${Styles.price} mr-3`}>{props.price}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <div>{props.name}</div>
      </div>
    </>
  )
})

export default Ingredient;
