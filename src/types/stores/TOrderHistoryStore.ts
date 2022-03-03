import {TOrder} from '../responses/TOrderListResponse';

type TOrderHistoryStore = {
  orders: TOrder[];
  total?: number;
  totalToday?: number;
  current?: TOrder;
};

export default TOrderHistoryStore;
