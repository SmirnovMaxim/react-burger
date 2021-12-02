import React from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from './item.module.css';
import {IConstructorItemProps} from '../../../../interfaces';

function ConstructorItem(props: IConstructorItemProps) {
  const isDraggable = !props.type;

  return (
    <div className={`${Styles.item} ${props.class}`}>
      <div className={Styles.icon}>
        {isDraggable && <DragIcon type="primary"/>}
      </div>
      <ConstructorElement {...props} />
    </div>
  );
}

export default ConstructorItem;
