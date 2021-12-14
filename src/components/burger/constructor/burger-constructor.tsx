import React, {useContext, useMemo, useState} from 'react';
import ConstructorItem from "./item/item";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorItem as ConstructorItemType, Ingredient, OrderDetailProps} from "../../../types";
import Styles from './burger-constructor.module.css';
import {getRandomBun, getIngredient, shuffle} from "../../../utils/helpers";
import {Types} from "../../../enums";
import OrderDetails from "./order-details/order-details";
import Modal from "../../elements/modal/modal";
import {BurgerContext, ErrorContext} from "../../../contexts";
import {API} from "../../../config/params";

function BurgerConstructor() {
  const { setError } = useContext(ErrorContext);
  let data: Ingredient[] = useContext(BurgerContext);
  data = useMemo(() => shuffle(data), [data]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [orderDetailProps, setOrderDetailProps] = useState<OrderDetailProps | null>(null);

  const ingredients = data.filter((item) => item.type !== Types.BUN)
    .slice(0, 7)
    .map((item: Ingredient): ConstructorItemType => {
      return {
        id: item._id,
        text: item.name,
        price: item.price,
        thumbnail: item.image,
      };
    });

  const randomBun = useMemo(() => getRandomBun(data), [data]);
  const totalCost = ingredients.reduce((result, current) => result + current.price, randomBun.price * 2);
  const topIngredient = useMemo(() => getIngredient(randomBun, 'top'), [randomBun]);
  const bottomIngredient = useMemo(() => getIngredient(randomBun, 'bottom'), [randomBun]);

  const onCreateOrder = async () => {
    try {
      const body = {
        ingredients: [
          ...ingredients,
          topIngredient,
          bottomIngredient,
        ].map((ingredient: ConstructorItemType) => ingredient.id),
      };
      const response = await fetch(`${API}orders`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        const data = JSON.parse(await response.text());
        throw Error(`Error: ${response.status}, ${data.message}`);
      }
      const {success, order} = await response.json();
      if (!success) {
        throw Error(`Failed parse data`);
      }
      setOrderDetailProps({ id: order.number });
      setShowModal(true);
    } catch (e) {
      const message = (e as Error).message;
      setError(message);
    }
  }

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
        <Button onClick={onCreateOrder}>Оформить заказ</Button>
      </div>
      {
        showModal && orderDetailProps &&
        <Modal onClose={() => setShowModal(false)}>
          <OrderDetails {...orderDetailProps}/>
        </Modal>
      }
    </section>
  );
}

export default BurgerConstructor;
