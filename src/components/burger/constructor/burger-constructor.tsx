import React from 'react';
import ConstructorItem from "./item/item";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorItem as ConstructorItemType, Ingredient} from "../../../types";
import data from '../../../utils/data.json';
import Styles from './burger-constructor.module.css';
import {getRandomNumber, shuffle} from "../../../utils/helpers";
import {Types} from "../../../enums";

function BurgerConstructor() {
  shuffle(data);

  const topIngredient = (): ConstructorItemType => {
    const buns = data.filter((item: Ingredient) => item.type === Types.BUN);
    const item = buns[getRandomNumber(buns.length - 1)];
    return {
      type: 'top',
      isLocked: Boolean(getRandomNumber(1)),
      text: item.name,
      price: item.price,
      thumbnail: item.image,
    }
  };

  const bottomIngredient = (): ConstructorItemType => {
    const buns = data.filter((item: Ingredient) => item.type === Types.BUN);
    const item = buns[getRandomNumber(buns.length - 1)];
    return {
      type: 'bottom',
      isLocked: Boolean(getRandomNumber(1)),
      text: item.name,
      price: item.price,
      thumbnail: item.image,
    }
  };

  const ingredients = data.slice(0, 7).map((item: Ingredient): ConstructorItemType => {
    return {
      isLocked: Boolean(getRandomNumber(1)),
      text: item.name,
      price: item.price,
      thumbnail: item.image,
    };
  });

  const totalCost = ingredients.reduce((result, current) => result + current.price, 0);

  return (
    <section>
      <div className={Styles.list}>
        <ConstructorItem {...topIngredient()} class={Styles.firstItem}/>
        <div className={`${Styles.mainIngredients} scrollable`}>
          {ingredients.map((item, i) => (<ConstructorItem key={`item-${i}`} {...item}/>))}
        </div>
        <ConstructorItem {...bottomIngredient()} class={Styles.lastItem}/>
      </div>

      <div className={Styles.constructorFooter}>
        <span className={`${Styles.cost} text text_type_digits-medium`}>
          <span className="mr-2">{totalCost}</span>
          <CurrencyIcon type="primary"/>
        </span>
        <Button>Оформить заказ</Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
