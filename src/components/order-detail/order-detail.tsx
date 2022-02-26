import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import React, {useEffect, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {OrderStatuses} from '../../enums';
import {fetchOrder} from '../../services/actions/orderHistory';
import {useDispatch, useSelector} from '../../services/hooks';
import {Ingredient} from '../../types';
import {formatDate} from '../../utils/helpers';
import Styles from './order-detail.module.css';

type TOrderIngredient = Ingredient & {
  qty: number;
}

export const OrderDetail = () => {
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const order = useSelector(store => store.orderHistory.current);
  const ingredients = useSelector((store) => {
    const ingredients = store.orderHistory.current?.ingredients.map((id) => store.app.ingredients.find(_ => _._id === id)!) || []
    const result: TOrderIngredient[] = [];
    ingredients.forEach((ingredient) => {
      const index = result.findIndex(item => item._id === ingredient._id);
      if (index === -1) {
        result.push({
          ...ingredient,
          qty: 1,
        });
      } else {
        result[index].qty += 1;
      }
    })
    return result;
  });
  const isDone = useMemo(() => order ? OrderStatuses[order.status] === OrderStatuses.done : false, [order]);
  const createdAt = useMemo(() => order ? formatDate(order.createdAt) : '', [order])
  const totalSum = useMemo(() => ingredients.reduce((res, item) => res + item.qty * item.price, 0), [ingredients]);

  useEffect(() => {
    dispatch(fetchOrder(params.id));
  }, [dispatch, params.id]);

  if (!order) {
    return (<></>);
  }

  return (
    <div className={Styles.orderDetail}>
      <div className={cn(Styles.orderNumber, 'text', 'text_type_digits-default')}>#{order.number}</div>
      <div className={Styles.orderName}>
        <h2>{order.name}</h2>
        <span className={cn({[Styles.done]: isDone})}>{OrderStatuses[order.status]}</span>
      </div>
      <div className={Styles.receipt}>
        <h2>Состав:</h2>
        <div className={Styles.container}>
          {ingredients.map((ingredient, i) => (
            <div className={Styles.ingredient} key={`${ingredient._id}-${i}`}>
              <div className={Styles.imgBlock}>
                <img src={ingredient.image_mobile} alt={ingredient.name}/>
              </div>
              <span className={Styles.ingredientName}>{ingredient.name}</span>
              <span className={cn(Styles.price, 'text', 'text_type_digits-default')}>
              <span>{ingredient.qty} x {ingredient.price}</span>
              <CurrencyIcon type="primary"/>
            </span>
            </div>
          ))}
        </div>
      </div>
      <div className={Styles.footer}>
        <span className={cn('text', 'text_type_main-default', 'text_color_inactive')}>
          {createdAt}
        </span>
        <span className={cn(Styles.price, 'text', 'text_type_digits-default')}>
          <span>{totalSum}</span>
          <CurrencyIcon type="primary"/>
        </span>
      </div>
    </div>
  );
}
