import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import React, {useEffect, useMemo, useState} from 'react';
import {useDrop} from 'react-dnd';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Routes, Types} from '../../../enums';
import {ADD_INGREDIENT_TO_ORDER, RESET_CURRENT_ORDER} from '../../../services/actions/burgerConstructor';
import {createOrder} from '../../../services/actions/order';
import {TRootStore} from '../../../types/stores';
import {getIngredient} from '../../../utils/helpers';
import Modal from '../../elements/modal/modal';
import Styles from './burger-constructor.module.css';
import ConstructorItem from './item/item';
import OrderDetails from './order-details/order-details';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {name} = useSelector((store: TRootStore) => store.user);
  const [{isHover}, drop] = useDrop(() => ({
    accept: 'newIngredient',
    drop: ({id}: { id: string }) => onDrop(id),
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  }));
  const [showModal, setShowModal] = useState<boolean>(false);
  const {orderNumber, mainIngredients, ingredients} = useSelector((store: TRootStore) => ({
    ingredients: store.app.ingredients,
    mainIngredients: store.burgerConstructor.currentOrder?.ingredients || [],
    orderNumber: store.burgerConstructor.number,
  }));

  const totalCost = useMemo(() => mainIngredients.reduce((result, current) => result + current.price, 0) || 0, [mainIngredients]);
  const isOrderEmpty = useMemo(() => totalCost === 0, [totalCost]);

  useEffect(() => {
    if (orderNumber) {
      setShowModal(true);
    }
  }, [orderNumber]);

  const onCreateOrder = () => {
    if (!mainIngredients.length) {
      return;
    }

    if (!name) {
      history.replace({pathname: Routes.LOGIN});
    } else {
      dispatch(createOrder(mainIngredients));
    }
  };
  const onCloseModal = () => {
    setShowModal(false);
    dispatch({type: RESET_CURRENT_ORDER});
  };
  const onDrop = (id: string) => {
    const item = ingredients.find(item => item._id === id);
    if (!item) {
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
    });
  }
  return (
    <section ref={drop} className={Styles.constructorSection}>
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
