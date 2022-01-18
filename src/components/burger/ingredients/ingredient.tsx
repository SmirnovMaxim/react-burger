import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import React, {memo, useCallback} from 'react';
import {useDrag} from 'react-dnd';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import {Routes} from '../../../enums';
import {SET_INGREDIENT, TOGGLE_MODAL} from '../../../services/actions/detailModal';
import {Ingredient as IngredientType} from '../../../types';
import {TRootStore} from '../../../types/stores';
import Styles from './ingredient.module.css';

const Ingredient = memo((props: IngredientType) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const counter = useSelector((store: TRootStore) => {
    return store.burgerConstructor.currentOrder?.ingredients.filter(_ => _.id === props._id)?.length || 0;
  });
  const [, drag] = useDrag(() => ({
    type: 'newIngredient',
    item: {id: props._id},
  }));
  const onShowDetails = useCallback(() => {
    dispatch({type: SET_INGREDIENT, ingredient: props});
    dispatch({type: TOGGLE_MODAL, value: true});

    history.replace({
      pathname: Routes.INGREDIENT_VIEW.replace(/:id/, props._id),
      state: {modal: location},
    })
  }, [dispatch, props, history, location]);

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
