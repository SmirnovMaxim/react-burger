type ConstructorItem = {
  id: string;
  type?: 'top' | 'bottom';
  isLocked?: boolean;
  handleClose?: () => void;
  text: string;
  thumbnail: string;
  price: number;
}

export default ConstructorItem;
