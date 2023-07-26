import React, { useContext } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { RecipeContext } from "../Context";

const RecipeComponent = ({ recipeDetails }) => {
	const { id, cuisine, title, image } = recipeDetails;
	const { setRecipeArr } = useContext(RecipeContext);

	function handleDeleteItem(id) {
		setRecipeArr((prev) => prev.filter((item) => item.id !== id));
	}
	return (
		<div className="border rounded-md w-[20vw] p-1 shadow-md shadow-gray-400 bg-gray-100 flex flex-col">
			<div className="relative w-full h-[250px] p-1">
				<Link to={`/${id}`}>
					<img className="w-full h-full" src={image} alt="" />
				</Link>
				<MdOutlineDeleteOutline
					size={20}
					className="absolute top-0 right-0 bg-white cursor-pointer"
					onClick={() => handleDeleteItem(id)}
				/>
			</div>

			<div className="p-1 flex flex-col gap-3 justify-between border-2 flex-grow ">
				<p className="text-lg font-bold">{title}</p>
				<div>
					<p>
						<span className="font-semibold mr-1">Cuisine Type:</span> {cuisine}
					</p>
					<p>
						<span className="font-semibold mr-1">Ingredients:</span> See Recipe
					</p>
					<p>
						<span className="font-semibold mr-1">Instructions:</span>See Recipe
					</p>
				</div>
			</div>
		</div>
	);
};

export default RecipeComponent;
