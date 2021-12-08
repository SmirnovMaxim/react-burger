import Modal from "../../../elements/modal/modal";
import {Ingredient} from "../../../../types";
import Styles from './ingredient-details.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type IngredientDetailProps = {
  onClose: () => void;
  ingredient: Ingredient,
}

function IngredientDetails(props: IngredientDetailProps) {
  const {ingredient} = props;
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
    <Modal onClose={props.onClose}>
      <div className={Styles.modalContent}>
        <h1 className={Styles.modalHeader}>
          Детали ингредиента
          <CloseIcon type="primary" onClick={props.onClose}/>
        </h1>
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
    </Modal>
  );
}

export default IngredientDetails;
