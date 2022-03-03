import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import React, {FC, memo, useCallback} from 'react';
import {useDrag} from 'react-dnd';
import {useHistory, useLocation} from 'react-router-dom';
import {Routes} from '../../../enums';
import {setIngredient, toggleModal} from '../../../services/actions/detailModal';
import {useDispatch, useSelector} from '../../../services/hooks';
import {Ingredient as IngredientType} from '../../../types';
import Styles from './ingredient.module.css';

const Ingredient: FC<IngredientType> = memo((props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const counter = useSelector((store) => {
    return store.burgerConstructor.currentOrder?.ingredients.filter(_ => _.id === props._id)?.length || 0;
  });
  const [, drag] = useDrag(() => ({
    type: 'newIngredient',
    item: {id: props._id},
  }));
  const onShowDetails = useCallback(() => {
    dispatch(setIngredient(props));
    dispatch(toggleModal(true));

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
