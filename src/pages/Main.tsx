import React, {useMemo} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useSelector} from 'react-redux';
import BurgerConstructor from '../components/burger/constructor/burger-constructor';
import BurgerIngredients from '../components/burger/ingredients/list/burger-ingredients';
import {TRootStore} from '../types/stores';
import Styles from './main.module.css';

export const MainPage = () => {
  const {ingredients} = useSelector((store: TRootStore) => store.app);
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
