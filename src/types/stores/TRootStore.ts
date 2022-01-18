import TAppStore from './TAppStore';
import TBurgerConstructorStore from './TBurgerConstructorStore';
import TDetailModalStore from './TDetailModalStore';
import TOrderStore from './TOrderStore';
import TUserStore from './TUserStore';

type TRootStore = {
  app: TAppStore,
  burgerConstructor: TBurgerConstructorStore,
  detailModal: TDetailModalStore,
  order: TOrderStore,
  user: TUserStore,
}

export default TRootStore;
