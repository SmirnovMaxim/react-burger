import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import React, {useCallback, useMemo} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {OrderStatuses, Routes} from '../../enums';
import {toggleModal} from '../../services/actions/detailModal';
import {useDispatch, useSelector} from '../../services/hooks';
import {TOrder} from '../../types/responses/TOrderListResponse';
import {formatDate} from '../../utils/helpers';
import Styles from './order-short.module.css';

type TOrderShortProps = {
  order: TOrder,
  route: Routes.FEED_VIEW | Routes.PROFILE_ORDER_VIEW,
}

export const OrderShort = ({order, route}: TOrderShortProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const appIngredients = useSelector(store => store.app.ingredients);

  const ingredients = order.ingredients.map((id) => {
    const ingredient = appIngredients.find(_ => _._id === id)!;
    return {
      url: ingredient.image_mobile,
      id: ingredient._id,
      price: ingredient.price
    }
  })

  const createdAt = useMemo(() => formatDate(order.createdAt), [order.createdAt]);
  const cost = useMemo(() => ingredients.reduce((res, current) => res + current.price, 0), [ingredients]);
  const quantity = useMemo(() => ingredients.length, [ingredients]);
  const isDone = useMemo(() => OrderStatuses[order.status] === OrderStatuses.done, [order.status]);

  const onShowDetails = useCallback(() => {
    dispatch(toggleModal(true));

    history.replace({
      pathname: route.replace(/:id/, `${order.number}`),
      state: {modal: location},
    })
  }, [dispatch, history, location, order.number, route]);

  return (
    <div className={Styles.order} onClick={onShowDetails}>
      <div className={Styles.header}>
        <span>#{order.number}</span>
        <span className={Styles.created}>{createdAt}</span>
      </div>

      <div>
        <div className={Styles.title}>{order.name}</div>
        <div className={cn({[Styles.done]: isDone})}>{OrderStatuses[order.status]}</div>
      </div>

      <div className={Styles.receipt}>
        <div className={Styles.ingredients}>
          {ingredients.slice(0, 5).map((image, index) => (
            <div className={Styles.imgBlock} key={`${image.id}-${index}`} style={{
              left: `${index * 48}px`,
              zIndex: 5 - index,
            }}>
              <img src={image.url} alt={image.id}/>
            </div>
          ))}
          {
            quantity > 5 &&
            <div className={cn(Styles.imgBlock, Styles.more)} key={`${ingredients[5].id}-more`} style={{
              left: `${5 * 48}px`,
            }}>
              <img src={ingredients[5].url} alt={ingredients[5].id}/>
              <span className={Styles.quantity}>+{quantity - 5}</span>
            </div>
          }
        </div>
        <div className={cn(Styles.cost, 'text', 'text_type_digits-default')}>
          {cost}
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  );
}
