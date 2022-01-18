import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import IngredientDetails from '../components/burger/ingredients/ingredient-details/ingredient-details';
import {RESET_ERROR, SET_ERROR} from '../services/actions/app';
import {Ingredient} from '../types';
import {TRootStore} from '../types/stores';

export const IngredientPage = () => {
  const params = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const {ingredients} = useSelector((store: TRootStore) => store.app);
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
