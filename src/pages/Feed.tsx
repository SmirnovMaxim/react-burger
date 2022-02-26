import cn from 'classnames';
import {useMemo} from 'react';
import {OrderList} from '../components/order-list/order-list';
import {OrderStatuses, Routes} from '../enums';
import {setOrderHistory} from '../services/actions/orderHistory';
import {useSelector} from '../services/hooks';
import {useSocket} from '../services/hooks/useSocket';
import {TOrder} from '../types/responses/TOrderListResponse';
import Styles from './feed.module.css';

const compare = (a: TOrder, b: TOrder) => {
  if (a.number > b.number) {
    return -1;
  }
  if (a.number < b.number) {
    return 1;
  }
  return 0;
}
const getOrderNumbers = (list: TOrder[], status: OrderStatuses): number[] =>
  list.filter(order => OrderStatuses[order.status] === status)
    .map(order => order.number)
    .slice(0, 30);

export const FeedPage = () => {
  useSocket(`orders/all`, setOrderHistory);

  const orderHistory = useSelector(store => store.orderHistory);
  const list = useMemo(() => orderHistory.orders.sort(compare), [orderHistory.orders]);

  const pendingOrders = useMemo(() => getOrderNumbers(list, OrderStatuses.pending), [list]);
  const doneOrders = useMemo(() => getOrderNumbers(list, OrderStatuses.done), [list]);

  return (
    <div>
      <h1>Лента заказов</h1>
      <div className={Styles.feed}>
        <OrderList orders={list} className={Styles.orderList} route={Routes.FEED_VIEW}/>
        <div className={Styles.stats}>
          <div className={Styles.ordersByStatus}>
            <div>
              <h2>Готовы</h2>
              <div className={Styles.numberList}>
                {doneOrders.map(number => <div className={cn(Styles.done, 'text', 'text_type_digits-default')}
                                               key={number}>{number}</div>)}
              </div>
            </div>
            <div>
              <h2>В работе</h2>
              <div className={Styles.numberList}>
                {pendingOrders.map(number => <span key={number}
                                                   className={cn('text', 'text_type_digits-default')}>{number}</span>)}
              </div>
            </div>
          </div>
          <div>
            <h2 className={Styles.counterTitle}>Выполнено за всё время</h2>
            <span className={cn(Styles.counter, 'text', 'text_type_digits-default')}>{orderHistory.total}</span>
          </div>
          <div>
            <h2 className={Styles.counterTitle}>Выполнено за сегодня</h2>
            <span className={cn(Styles.counter, 'text', 'text_type_digits-default')}>{orderHistory.totalToday}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
