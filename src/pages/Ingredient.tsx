import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import IngredientDetails from '../components/burger/ingredients/ingredient-details/ingredient-details';
import {RESET_ERROR, SET_ERROR} from '../services/constants';
import {useDispatch, useSelector} from '../services/hooks';
import {Ingredient} from '../types';

export const IngredientPage = () => {
  const params = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const {ingredients} = useSelector((store) => store.app);
  const [ingredient, setIngredient] = useState<Ingredient | undefined>();

  useEffect(() => {
    setIngredient(ingredients.find(_ => _._id === params.id));
    if (ingredients.length && !ingredient) {
      dispatch({type: SET_ERROR, error: 'Ингредиент с таким ID не найден'});
    }

    return () => {
      dispatch({type: RESET_ERROR});
    }
  }, [ingredients, ingredient, dispatch, params.id]);

  return (
    <div>
      {
        ingredient
          ? <IngredientDetails />
          : <></>
      }
    </div>
  );
}
