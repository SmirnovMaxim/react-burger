import {CurrentOrder} from '../Order';

type TBurgerConstructorStore = {
  currentOrder: CurrentOrder | null;
  number?: number;
}

export default TBurgerConstructorStore;
