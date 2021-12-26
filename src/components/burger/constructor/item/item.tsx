import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import React, {useRef} from 'react';
import {DropTargetMonitor, useDrag, useDrop, XYCoord} from 'react-dnd';
import {useDispatch} from 'react-redux';
import {DragEventTypes, Types} from '../../../../enums';
import {MOVE_INGREDIENTS, REMOVE_INGREDIENT_FROM_ORDER} from '../../../../services/actions/burgerConstructor';
import {ConstructorItem as ConstructorItemType, TDragItem} from '../../../../types';
import Styles from './item.module.css';

type TConstructorItemProps = ConstructorItemType & {
  class?: string;
  index?: number;
}

function ConstructorItem(props: TConstructorItemProps) {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [{isDragging}, drag] = useDrag(() => ({
    type: props.type,
    item: (): TDragItem => ({
      id: props.id,
      index: props.index,
      event: DragEventTypes.MOVE,
    }),
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const [{isOver}, drop] = useDrop({
    accept: [Types.SAUCE, Types.MAIN],
    hover: (item: TDragItem, monitor: DropTargetMonitor) => onHover(item, monitor),
    drop: (item: TDragItem) => onDrop(item),
    collect: monitor => ({
      isOver: monitor.isOver()
    }),
  })

  const isDraggable = !props.position;
  const isBun = props.type === Types.BUN;
  const opacity = isDragging ? 0 : 1;

  const onDeleteItem = () => {
    if (isBun) {
      return;
    }
    dispatch({type: REMOVE_INGREDIENT_FROM_ORDER, value: props.uniqueId});
  }
  const onHover = (item: TDragItem, monitor: DropTargetMonitor) => {
    if (!ref.current) {
      return
    }
    const dragIndex = item.index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex || dragIndex === undefined || hoverIndex === undefined) {
      return;
    }

    const hoverBoundingRect = ref.current?.getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    item.newIndex = hoverIndex;

  }
  const onDrop = (item: TDragItem) => {
    const { index, newIndex } = item;
    if (index !== undefined && newIndex !== undefined && newIndex >= 0 && index >= 0) {
      dispatch({
        type: MOVE_INGREDIENTS,
        dragIndex: item.index,
        hoverIndex: item.newIndex,
      });
    }
  }

  drag(drop(ref));

  return (
    <div {...(isBun ? {} : {ref})}
         style={{opacity}}
         className={cn([Styles.item, props.class, { [Styles.hover]: isOver }])}>
      <div className={Styles.icon}>
        {isDraggable && <DragIcon type="primary"/>}
      </div>
      <ConstructorElement {...props} type={props.position} handleClose={onDeleteItem}/>
    </div>
  );
}

export default ConstructorItem;
