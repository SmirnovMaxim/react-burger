import cn from 'classnames';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useLocation, useParams} from 'react-router-dom';
import {TRootStore} from '../../../../types/stores';
import Styles from './ingredient-details.module.css';

function IngredientDetails() {
  const {id} = useParams<{ id?: string }>();
  const location = useLocation();
  // @ts-ignore
  const isModalOpen = location.state && location.state.modal;
  const {ingredients} = useSelector((store: TRootStore) => store.app);
  const ingredient = useMemo(() => ingredients.find(ingredient => ingredient._id === id), [id, ingredients]);

  if (!ingredient) return (<></>);

  const composition = [
    {
      name: 'Калории, ккал',
      value: ingredient.calories,
    },
    {
      name: 'Белки, г',
      value: ingredient.proteins,
    },
    {
      name: 'Жиры, г',
      value: ingredient.fat,
    },
    {
      name: 'Углеводы, г',
      value: ingredient.carbohydrates,
    },
  ];

  return (
    <div className={cn(Styles.content, {[Styles.page]: !isModalOpen})}>
      <h1 className={Styles.header}>Детали ингредиента</h1>
      <div className={Styles.body}>
        <img className={Styles.img} src={ingredient.image_large} alt={ingredient.name}/>
        <h2 className={Styles.name}>{ingredient.name}</h2>
        <div className={Styles.composition}>
          {composition.map((item, i) => (
            <div key={i} className={`${Styles.compositionItem} text_color_inactive`}>
              <span>{item.name}</span>
              <span className={`${Styles.compositionValue} text text_type_digits-medium`}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;
