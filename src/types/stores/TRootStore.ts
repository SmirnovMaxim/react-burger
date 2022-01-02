import TAppStore from './TAppStore';
import TBurgerConstructorStore from './TBurgerConstructorStore';
import TDetailModalStore from './TDetailModalStore';
import TOrderStore from './TOrderStore';

type TRootStore = {
  app: TAppStore,
  burgerConstructor: TBurgerConstructorStore,
  detailModal: TDetailModalStore,
  order: TOrderStore,
}

export default TRootStore;
