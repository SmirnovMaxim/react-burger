import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import React, {FC, useRef} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import {useDispatch} from 'react-redux';
import {Types} from '../../../../enums';
import {MOVE_INGREDIENTS, REMOVE_INGREDIENT_FROM_ORDER} from '../../../../services/actions/burgerConstructor';
import {ConstructorItem as ConstructorItemType} from '../../../../types';
import Styles from './item.module.css';

type TConstructorItemProps = ConstructorItemType & {
  index: number;
}

const ConstructorItem: FC<TConstructorItemProps> = (props) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [{isDragging}, drag] = useDrag(() => ({
    type: 'moveIngredient',
    item: {index: props.index},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }), [props.index]);
  const [, drop] = useDrop({
    accept: 'moveIngredient',
    hover: (item: { index: number }) => onHover(item),
  })

  const isBun = props.type === Types.BUN;
  const opacity = isDragging ? 0 : 1;

  const onDeleteItem = (): void => {
    if (isBun) {
      return;
    }
    dispatch({type: REMOVE_INGREDIENT_FROM_ORDER, value: props.uniqueId});
  }
  const onHover = (item: { index: number }): void => {
    if (!ref.current) {
      return;
    }
    const dragIndex = item.index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    dispatch({type: MOVE_INGREDIENTS, dragIndex, hoverIndex});

    item.index = hoverIndex;
  }

  drag(drop(ref));

  return (
    <div {...(isBun ? {} : {ref})}
         style={{opacity}}
         className={cn([Styles.item, {[Styles.bun]: isBun}])}>
      <div className={Styles.icon}>
        {!isBun && <DragIcon type="primary"/>}
      </div>
      <ConstructorElement {...props} type={props.position} handleClose={onDeleteItem}/>
    </div>
  );
}

export default ConstructorItem;
