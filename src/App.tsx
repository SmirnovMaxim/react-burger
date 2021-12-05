import React from 'react';
import AppHeader from './components/header/app-header';
import BurgerIngredientList from "./components/burger/ingredients/list/burger-ingredient-list";
import BurgerConstructor from "./components/burger/constructor/burger-constructor";

function App() {
  return (
    <div className="text_type_main-default">
      <AppHeader/>
      <main className="container">
        <div className="body">
          <BurgerIngredientList/>
          <BurgerConstructor/>
        </div>
      </main>
    </div>
  );
}

export default App;
