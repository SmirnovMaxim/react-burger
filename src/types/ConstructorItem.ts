import {Types} from '../enums';

type ConstructorItem = {
  id: string;
  type: Types;
  isLocked?: boolean;
  position?: 'top' | 'bottom';
  text: string;
  thumbnail: string;
  price: number;
}

export default ConstructorItem;
