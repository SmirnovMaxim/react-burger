import TAppStore from './TAppStore';
import TBurgerConstructorStore from './TBurgerConstructorStore';
import TDetailModalStore from './TDetailModalStore';
import TOrderStore from './TOrderStore';
import TResetPasswordStore from './TResetPasswordStore';
import TUserStore from './TUserStore';

type TRootStore = {
  app: TAppStore,
  burgerConstructor: TBurgerConstructorStore,
  detailModal: TDetailModalStore,
  order: TOrderStore,
  resetPassword: TResetPasswordStore,
  user: TUserStore,
}

export default TRootStore;
