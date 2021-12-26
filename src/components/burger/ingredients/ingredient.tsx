import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import React, {memo, useCallback} from 'react';
import {useDrag} from 'react-dnd';
import {useDispatch, useSelector} from 'react-redux';
import {DragEventTypes} from '../../../enums';
import {SET_INGREDIENT} from '../../../services/actions/app';
import {Ingredient as IngredientType, TDragItem} from '../../../types';
import {TRootStore} from '../../../types/stores';
import Styles from './ingredient.module.css';

const Ingredient = memo((props: IngredientType) => {
  const dispatch = useDispatch();
  const counter = useSelector((store: TRootStore) => {
    return store.order.currentOrder?.ingredients.filter(_ => _.id === props._id)?.length || 0;
  });
  const [, drag] = useDrag(() => ({
    type: props.type,
    item: (): TDragItem => ({
      id: props._id,
      index: 0,
      event: DragEventTypes.ADD,
    }),
  }));
  const onShowDetails = useCallback(() => {
    dispatch({type: SET_INGREDIENT, ingredient: props});
  }, [dispatch, props]);

  return (
    <div className={cn('text text_type_main-default p-4', Styles.ingredient)} onClick={onShowDetails}>
      {counter > 0 && <Counter count={counter}/>}
      <div ref={drag} className={Styles.content}>
        <img src={props.image} alt={props.name}/>
        <div>
          <span className={`${Styles.price} mr-3`}>{props.price}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <div>{props.name}</div>
      </div>
    </div>
  )
})

export default Ingredient;
