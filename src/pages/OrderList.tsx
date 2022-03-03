import {OrderList} from '../components/order-list/order-list';
import {Routes} from '../enums';
import {setOrderHistory} from '../services/actions/orderHistory';
import {useSelector} from '../services/hooks';
import {useSocket} from '../services/hooks/useSocket';
import {TOrder} from '../types/responses/TOrderListResponse';
import {getCookie} from '../utils/helpers';
import Styles from './order-list.module.css';

function compare(a: TOrder, b: TOrder) {
  if (a.number > b.number) {
    return -1;
  }
  if (a.number < b.number) {
    return 1;
  }
  return 0;
}

export const OrderListPage = () => {
  const token = getCookie('accessToken');
  useSocket(`orders?token=${token}`, setOrderHistory);

  const list = useSelector(store => store.orderHistory.orders.sort(compare));

  return (
    <>
      <OrderList orders={list} className={Styles.orderContainer} route={Routes.PROFILE_ORDER_VIEW}/>
    </>
  );
}
