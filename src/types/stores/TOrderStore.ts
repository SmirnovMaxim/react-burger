import { CurrentOrder, Order } from '../Order';

type TOrderStore = {
  orders: Order[],
  currentOrder: CurrentOrder | null,
  currentOrderNumber: number | null,
}

export default TOrderStore;
