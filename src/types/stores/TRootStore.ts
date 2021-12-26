import TAppStore from './TAppStore';
import TOrderStore from './TOrderStore';

type TRootStore = {
  app: TAppStore,
  order: TOrderStore,
}

export default TRootStore;
