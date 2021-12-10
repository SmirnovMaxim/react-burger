import {Ingredient} from "../../../../types";
import Styles from './ingredient-details.module.css';

function IngredientDetails(props: Ingredient) {
  const ingredient = {...props};
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
    <div className={Styles.content}>
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
