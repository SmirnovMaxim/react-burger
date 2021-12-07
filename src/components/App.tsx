import React from 'react';
import AppHeader from './header/app-header';
import BurgerIngredients from "./burger/ingredients/list/burger-ingredients";
import BurgerConstructor from "./burger/constructor/burger-constructor";
import data from '../utils/data.json';
import Styles from './app.module.css';
import {Ingredient} from "../types";
import {Types} from "../enums";

function App() {
  const ingredients: Ingredient[] = data.map(item => ({
    ...item,
    type: item.type as Types,
  }));

  return (
    <div className="text_type_main-default">
      <AppHeader/>
      <main className={Styles.container}>
        <div className={Styles.body}>
          <BurgerIngredients {...ingredients}/>
          <BurgerConstructor {...ingredients}/>
        </div>
      </main>
    </div>
  );
}

export default App;
