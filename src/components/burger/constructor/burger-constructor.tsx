import React from 'react';
import ConstructorItem from "./item/item";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorItem as ConstructorItemType, Ingredient} from "../../../types";
import Styles from './burger-constructor.module.css';
import {getRandomNumber, shuffle} from "../../../utils/helpers";
import {Types} from "../../../enums";

function BurgerConstructor(props: Ingredient[]) {
  const data: Ingredient[] = Object.values(props);

  shuffle(data);

  const getIngredient = (type: 'top' | 'bottom'): ConstructorItemType => {
    const buns = data.filter((item: Ingredient) => item.type === Types.BUN);
    const item = buns[getRandomNumber(buns.length - 1)];
    const text = type === 'top' ? `${item.name} (верх)` : `${item.name} (низ)`;

    return {
      type,
      text,
      isLocked: true,
      price: item.price,
      thumbnail: item.image,
    }
  };

  const ingredients = data.filter((item) => item.type !== Types.BUN)
    .slice(0, 7)
    .map((item: Ingredient): ConstructorItemType => {
      return {
        text: item.name,
        price: item.price,
        thumbnail: item.image,
      };
    });

  const totalCost = ingredients.reduce((result, current) => result + current.price, 0);

  return (
    <section>
      <div className={Styles.list}>
        <ConstructorItem {...getIngredient('top')} class={Styles.firstItem}/>
        <div className={Styles.mainIngredients}>
          {ingredients.map((item, i) => (<ConstructorItem key={`item-${i}`} {...item}/>))}
        </div>
        <ConstructorItem {...getIngredient('bottom')} class={Styles.lastItem}/>
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
