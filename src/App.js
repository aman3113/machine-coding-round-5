import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import RecipePage from "./Components/RecipePage";
import ErrorPage from "./Components/ErrorPage";
import RecipeContextProvider from "./Context";

function App() {
	return (
		<ChakraProvider>
			<RecipeContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/:recipeId" element={<RecipePage />} />
						<Route path="*" element={<ErrorPage />} />
					</Routes>
				</BrowserRouter>
			</RecipeContextProvider>
		</ChakraProvider>
	);
}

export default App;
