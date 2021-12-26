import {CurrentOrder} from '../Order';

type TBurgerConstructorStore = {
  currentOrder: CurrentOrder | null,
  currentOrderNumber: number | null,
}

export default TBurgerConstructorStore;
