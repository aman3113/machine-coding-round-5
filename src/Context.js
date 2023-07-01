import { createContext, useState } from "react";
import { RecipeArr } from "./Data";

export const RecipeContext = createContext();

const RecipeContextProvider = ({ children }) => {
	const [recipeArr, setRecipeArr] = useState(RecipeArr);
	return (
		<RecipeContext.Provider value={{ recipeArr, setRecipeArr }}>
			{children}
		</RecipeContext.Provider>
	);
};

export default RecipeContextProvider;
