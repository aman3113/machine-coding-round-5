import React, { useContext } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { RecipeContext } from "../Context";

const RecipeComponent = ({ recipeDetails }) => {
	const { id, directions, ingredients, cuisine, title, image } = recipeDetails;
	const { recipeArr, setRecipeArr } = useContext(RecipeContext);

	function handleDeleteItem(id) {
		setRecipeArr((prev) => prev.filter((item) => item.id !== id));
	}
	return (
		<div className="border-2 rounded-md w-[20vw]">
			<div className="relative w-full h-[250px] p-1">
				<Link to={`/${id}`}>
					<img className="w-full h-full" src={image} alt="" />
				</Link>
				<MdOutlineDeleteOutline
					className="absolute top-0 right-0 bg-white cursor-pointer"
					onClick={() => handleDeleteItem(id)}
				/>
			</div>

			<div className="p-1">
				<p className="text-lg font-bold">{title}</p>
				<div>
					<p>
						<span className="text-semibold">Cuisine Type:</span> {cuisine}
					</p>
					<p>
						<span className="text-semibold">Ingredients:</span> See Recipe
					</p>
					<p>
						<span className="text-semibold">Instructions:</span>See Recipe
					</p>
				</div>
			</div>
		</div>
	);
};

export default RecipeComponent;
