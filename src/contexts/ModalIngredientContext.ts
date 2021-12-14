import React from "react";
import {Ingredient} from "../types";

const ModalIngredientContext = React.createContext<(ingredient: Ingredient) => void>(() => {});

export default ModalIngredientContext;
