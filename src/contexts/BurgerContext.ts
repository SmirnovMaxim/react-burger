import React from 'react';
import {Ingredient} from "../types";

const BurgerContext = React.createContext<Ingredient[]>([]);

export default BurgerContext;
