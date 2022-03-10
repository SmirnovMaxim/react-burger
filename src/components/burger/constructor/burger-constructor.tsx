import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import React, {useEffect, useMemo, useState} from 'react';
import {useDrop} from 'react-dnd';
import {useHistory} from 'react-router-dom';
import {Routes, Types} from '../../../enums';
import {addIngredientToOrder} from '../../../services/actions/burgerConstructor';
import {createOrder} from '../../../services/actions/order';
import {RESET_CURRENT_ORDER} from '../../../services/constants';
import {useDispatch, useSelector} from '../../../services/hooks';
import Modal from '../../elements/modal/modal';
import Styles from './burger-constructor.module.css';
import ConstructorItem from './item/item';
import OrderDetails from './order-details/order-details';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {name} = useSelector(store => store.user);
  const [{isHover}, drop] = useDrop(() => ({
    accept: 'newIngredient',
    drop: ({id}: { id: string }) => onDrop(id),
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  }));
  const [showModal, setShowModal] = useState<boolean>(false);
  const {orderNumber, mainIngredients, ingredients} = useSelector((store) => ({
    ingredients: store.app.ingredients,
    mainIngredients: store.burgerConstructor.currentOrder?.ingredients || [],
    orderNumber: store.burgerConstructor.number,
  }));

  const totalCost = mainIngredients.reduce((result, current) => result + current.price, 0);
  const isOrderEmpty = useMemo(() => totalCost === 0, [totalCost]);

  useEffect(() => {
    if (orderNumber) {
      setShowModal(true);
    }
  }, [orderNumber]);

  const onCreateOrder = (): void => {
    if (!mainIngredients.length) {
      return;
    }

    if (!name) {
      history.replace({pathname: Routes.LOGIN});
    } else {
      dispatch(createOrder(mainIngredients));
    }
  };
  const onCloseModal = (): void => {
    setShowModal(false);
    dispatch({type: RESET_CURRENT_ORDER});
  };
  const onDrop = (id: string): void => {
    const item = ingredients.find(item => item._id === id);
    if (!item) {
      return;
    }

    if (item.type === Types.BUN) {
      dispatch(addIngredientToOrder(item, 'top'));
      dispatch(addIngredientToOrder(item, 'bottom'));
      return;
    }

    dispatch(addIngredientToOrder(item));
  }
  return (
    <section ref={drop} className={Styles.constructorSection} data-test-id="constructor">
      {
        isOrderEmpty
          ?
          <div className={cn(Styles.listEmpty, {[Styles.listEmptyHover]: isHover})}>
            <span>Перетащите сюда ингредиенты</span>
          </div>
          :
          <>
            <div className={Styles.list}>
              {mainIngredients.map((item, i) => (<ConstructorItem index={i} key={item.uniqueId} {...item}/>))}
            </div>
            <div className={Styles.constructorFooter}>
            <span className={`${Styles.cost} text text_type_digits-medium`}>
              <span className="mr-2">{totalCost}</span>
              <CurrencyIcon type="primary"/>
            </span>
              <Button onClick={onCreateOrder}>Оформить заказ</Button>
            </div>
          </>
      }
      {
        showModal &&
        <Modal onClose={onCloseModal}>
          <OrderDetails id={orderNumber!}/>
        </Modal>
      }
    </section>
  );
}

export default BurgerConstructor;
