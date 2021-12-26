import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import React, {useMemo} from 'react';
import {useDrop} from 'react-dnd';
import {useDispatch, useSelector} from 'react-redux';
import {DragEventTypes, Types} from '../../../enums';
import {ADD_INGREDIENT_TO_ORDER, RESET_CURRENT_ORDER} from '../../../services/actions/burgerConstructor';
import {createOrder} from '../../../services/actions/order';
import {TDragItem} from '../../../types';
import {TRootStore} from '../../../types/stores';
import {getIngredient} from '../../../utils/helpers';
import Modal from '../../elements/modal/modal';
import Styles from './burger-constructor.module.css';
import ConstructorItem from './item/item';
import OrderDetails from './order-details/order-details';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const [{isHover}, drop] = useDrop(() => ({
    accept: [Types.BUN, Types.MAIN, Types.SAUCE],
    drop: (item: TDragItem) => onDrop(item),
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  }));
  const {ingredients, orderNumber, currentOrder} = useSelector((store: TRootStore) => ({
    ingredients: store.app.ingredients,
    currentOrder: store.burgerConstructor.currentOrder,
    orderNumber: store.burgerConstructor.currentOrderNumber,
  }));

  const mainIngredients = useMemo(
    () => currentOrder?.ingredients.filter(el => el.type !== Types.BUN) || [],
    [currentOrder],
  );
  const topIngredient = useMemo(() => currentOrder?.ingredients.find(el => el.type === Types.BUN && el.position === 'top'), [currentOrder]);
  const bottomIngredient = useMemo(() => currentOrder?.ingredients.find(el => el.type === Types.BUN && el.position === 'bottom'), [currentOrder]);

  const totalCost = useMemo(() => currentOrder?.ingredients.reduce((result, current) => result + current.price, 0) || 0, [currentOrder]);
  const isOrderEmpty = useMemo(() => totalCost === 0, [totalCost]);

  const onCreateOrder = () => {
    if (currentOrder) {
      dispatch(createOrder(currentOrder.ingredients));
    }
  };
  const onCloseModal = () => dispatch({type: RESET_CURRENT_ORDER});
  const onDrop = (dropItem: TDragItem) => {
    const item = ingredients.find(item => item._id === dropItem.id);
    if (!item || dropItem.event === DragEventTypes.MOVE) {
      return;
    }

    if (item.type === Types.BUN) {
      dispatch({
        type: ADD_INGREDIENT_TO_ORDER,
        value: getIngredient(item, 'top'),
      });
      dispatch({
        type: ADD_INGREDIENT_TO_ORDER,
        value: getIngredient(item, 'bottom'),
      });
      return;
    }

    dispatch({
      type: ADD_INGREDIENT_TO_ORDER,
      value: getIngredient(item),
      index: dropItem.index,
    });
  };

  return (
    <section ref={drop} className={Styles.constructorSection}>
      {
        isOrderEmpty &&
        <div className={cn(Styles.listEmpty, {[Styles.listEmptyHover]: isHover})}>
          <span>Перетащите сюда ингредиенты</span>
        </div>
      }
      <div className={Styles.list}>
        {topIngredient && <ConstructorItem {...topIngredient} class={Styles.firstItem}/>}
        <div className={Styles.mainIngredients}>
          {mainIngredients.map((item, i) => (<ConstructorItem index={i} key={item.uniqueId} {...item}/>))}
        </div>
        {bottomIngredient && <ConstructorItem {...bottomIngredient} class={Styles.lastItem}/>}
      </div>

      {
        !isOrderEmpty &&
        <div className={Styles.constructorFooter}>
          <span className={`${Styles.cost} text text_type_digits-medium`}>
            <span className="mr-2">{totalCost}</span>
            <CurrencyIcon type="primary"/>
          </span>
          <Button onClick={onCreateOrder}>Оформить заказ</Button>
        </div>
      }
      {
        orderNumber &&
        <Modal onClose={onCloseModal}>
          <OrderDetails id={orderNumber}/>
        </Modal>
      }
    </section>
  );
}

export default BurgerConstructor;
