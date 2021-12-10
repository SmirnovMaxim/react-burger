import React, {useMemo, useState} from 'react';
import ConstructorItem from "./item/item";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorItem as ConstructorItemType, Ingredient, IngredientProps} from "../../../types";
import Styles from './burger-constructor.module.css';
import {getRandomNumber, shuffle} from "../../../utils/helpers";
import {Types} from "../../../enums";
import OrderDetails from "./order-details/order-details";
import Modal from "../../elements/modal/modal";

const getIngredient = (data: Ingredient[], type: 'top' | 'bottom'): ConstructorItemType => {
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

function BurgerConstructor(props: IngredientProps) {
  const data: Ingredient[] = useMemo(() => shuffle(props.ingredients), [props.ingredients]);
  const [showModal, setShowModal] = useState<boolean>(false);

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
  const topIngredient = useMemo(() => getIngredient(data, 'top'), [data]);
  const bottomIngredient = useMemo(() => getIngredient(data, 'bottom'), [data]);

  return (
    <section>
      <div className={Styles.list}>
        <ConstructorItem {...topIngredient} class={Styles.firstItem}/>
        <div className={Styles.mainIngredients}>
          {ingredients.map((item, i) => (<ConstructorItem key={`item-${i}`} {...item}/>))}
        </div>
        <ConstructorItem {...bottomIngredient} class={Styles.lastItem}/>
      </div>

      <div className={Styles.constructorFooter}>
        <span className={`${Styles.cost} text text_type_digits-medium`}>
          <span className="mr-2">{totalCost}</span>
          <CurrencyIcon type="primary"/>
        </span>
        <Button onClick={() => setShowModal(true)}>Оформить заказ</Button>
      </div>
      {
        showModal &&
        <Modal onClose={() => setShowModal(false)}>
          <OrderDetails/>
        </Modal>
      }
    </section>
  );
}

export default BurgerConstructor;
