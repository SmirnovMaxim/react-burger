import {Routes} from '../../enums';
import {TOrder} from '../../types/responses/TOrderListResponse';
import {OrderShort} from '../order-short/order-short';
import Styles from './order-list.module.css';
import cn from 'classnames';

type TOrderListProps = {
  orders: TOrder[];
  className: string;
  route: Routes.FEED_VIEW | Routes.PROFILE_ORDER_VIEW,
}

export const OrderList = ({orders, className, route}: TOrderListProps) => {
  return (
    <div className={cn(Styles.orderContainer, className)}>
      {orders.map(order => <OrderShort key={order.number} order={order} route={route}/>)}
    </div>
  )
}
