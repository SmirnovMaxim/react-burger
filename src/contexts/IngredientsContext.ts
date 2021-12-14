import React from 'react';
import {Ingredient} from "../types";

const IngredientsContext = React.createContext<Ingredient[]>([]);

export default IngredientsContext;
