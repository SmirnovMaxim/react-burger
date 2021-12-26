import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useEffect, useMemo} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useDispatch, useSelector} from 'react-redux';
import {getIngredients, RESET_ERROR} from '../../services/actions/app';
import {TRootStore} from '../../types/stores';
import BurgerConstructor from '../burger/constructor/burger-constructor';
import BurgerIngredients from '../burger/ingredients/list/burger-ingredients';
import AppHeader from '../header/app-header';
import Styles from './app.module.css';

function App() {
  const dispatch = useDispatch();
  const {ingredients, error} = useSelector((store: TRootStore) => store.app);
  const hasIngredients = useMemo(() => (ingredients || []).length > 0, [ingredients]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const onCloseError = () => dispatch({type: RESET_ERROR});

  return (
    <div className="text_type_main-default">
      <AppHeader/>
      <main className={Styles.container}>
        {
          error &&
          <div className={Styles.alertDanger}>
            <span className={Styles.errorMessage}>{error}</span>
            <CloseIcon type="primary" onClick={onCloseError}/>
          </div>
        }
        <div className={Styles.body}>
          {
            hasIngredients &&
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </DndProvider>
          }
        </div>
      </main>
    </div>
  );
}

export default App;
