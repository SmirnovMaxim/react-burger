import React, {useEffect, useState} from 'react';
import AppHeader from '../header/app-header';
import BurgerIngredients from "../burger/ingredients/list/burger-ingredients";
import BurgerConstructor from "../burger/constructor/burger-constructor";
import Styles from './app.module.css';
import {Ingredient} from "../../types";
import {API} from '../../config/params';
import {ErrorContext, IngredientsContext} from "../../contexts";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(`${API}ingredients`);
        if (!response.ok) {
          throw Error(`Error: ${response.status}`);
        }
        const {success, data} = await response.json();
        if (!success) {
          throw Error(`Failed parse data`);
        }
        setIngredients(data);
      } catch (e) {
        const message = (e as Error).message;
        setError(message);
      }
    }

    fetchIngredients();
  }, []);

  const hasIngredients = ingredients.length > 0;

  return (
    <div className="text_type_main-default">
      <AppHeader/>
      <main className={Styles.container}>
        {
          error &&
          <div className={Styles.alertDanger}>
            <span className={Styles.errorMessage}>{error}</span>
            <CloseIcon type="primary" onClick={() => setError(null)}/>
          </div>
        }
        <div className={Styles.body}>
          {
            hasIngredients &&
            <>
              <BurgerIngredients ingredients={ingredients}/>
              <ErrorContext.Provider value={{ error, setError }}>
                <IngredientsContext.Provider value={ingredients}>
                  <BurgerConstructor/>
                </IngredientsContext.Provider>
              </ErrorContext.Provider>
            </>
          }
        </div>
      </main>
    </div>
  );
}

export default App;
