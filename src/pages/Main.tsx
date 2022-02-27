import React, {useMemo} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import BurgerConstructor from '../components/burger/constructor/burger-constructor';
import BurgerIngredients from '../components/burger/ingredients/list/burger-ingredients';
import {useSelector} from '../services/hooks';
import Styles from './main.module.css';

export const MainPage = () => {
  const {ingredients} = useSelector(store => store.app);
  const hasIngredients = useMemo(() => (ingredients || []).length > 0, [ingredients]);

  return (
    <div className={Styles.container}>
      <div className={Styles.body}>
        {
          hasIngredients &&
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </DndProvider>
        }
      </div>
    </div>
  );
}
