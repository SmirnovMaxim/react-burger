import {DragEventTypes} from '../enums';

type TDragItem = {
  index?: number;
  newIndex?: number;
  id: string;
  event: DragEventTypes,
}

export default TDragItem;
