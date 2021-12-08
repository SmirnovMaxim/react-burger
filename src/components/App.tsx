import React, {useEffect, useState} from 'react';
import AppHeader from './header/app-header';
import BurgerIngredients from "./burger/ingredients/list/burger-ingredients";
import BurgerConstructor from "./burger/constructor/burger-constructor";
import Styles from './app.module.css';
import {Ingredient} from "../types";

const API = 'https://norma.nomoreparties.space/';

function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = () => {
    fetch(`${API}api/ingredients`)
      .then(response => response.json())
      .then(({ data }) => setIngredients(data))
      .catch(e => console.error(e));
  }

  const hasIngredients = ingredients.length > 0;

  return (
    <div className="text_type_main-default">
      <AppHeader/>
      <main className={Styles.container}>
        <div className={Styles.body}>
          {
            hasIngredients &&
            <>
              <BurgerIngredients ingredients={ingredients}/>
              <BurgerConstructor ingredients={ingredients}/>
            </>
          }
        </div>
      </main>
    </div>
  );
}

export default App;
