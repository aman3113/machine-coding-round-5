import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from "@chakra-ui/react";
import { RecipeContext } from "../Context";
import RecipeComponent from "./RecipeComponent";

const HomePage = () => {
	const { recipeArr, setRecipeArr } = useContext(RecipeContext);
	const [itemArr, setItemArr] = useState(recipeArr);
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("title");
	const [openRecipeModal, setOpenRecipeModal] = useState(false);
	const [formData, setFormData] = useState({
		cuisine: "",
		title: "",
		ingredients: [],
		directions: [],
		image: "",
	});

	const [textAreaData, setTextAreaData] = useState({
		ingredients: "",
		directions: "",
	});

	function handleFormOnChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function handleTextAreaOnChange(e) {
		const { name, value } = e.target;
		setTextAreaData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function handleAddTextAreaItem(e) {
		if (e.key === "Enter") {
			if (e.target.value === "ingredients") {
				setFormData((prev) => ({
					...prev,
					ingredients: [...prev.ingredients, e.target.value],
				}));
			} else {
				setFormData((prev) => ({
					...prev,
					directions: [...prev.directions, e.target.value],
				}));
			}
		}
	}

	function addRecipe() {
		setRecipeArr((prev) => [...prev, { id: uuidv4(), ...formData }]);
		setOpenRecipeModal(false);
	}

	function handleKeyDown() {
		console.log(filter);
		if (filter === "ingredients") {
			setItemArr(
				recipeArr.filter((item) =>
					item[filter].join(" ").toLowerCase().includes(search.toLowerCase())
				)
			);
		} else {
			setItemArr(
				recipeArr.filter((item) =>
					item[filter].toLowerCase().includes(search.toLowerCase())
				)
			);
		}
	}

	function handleCategoryChange(e) {
		setFilter(e.target.value);
	}

	return (
		<div className="p-3">
			<p className="text-3xl font-bold p-4 text-center">Let's Cook</p>
			<div className="flex gap-2 items-center ">
				<input
					type="search"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="search your query here.."
					className="border rounded-md"
				/>
				<div className="flex gap-2 items-center cursor-pointer">
					<label>
						<input
							type="radio"
							value="title"
							checked={filter === "title"}
							name="search_type"
							onChange={handleCategoryChange}
						/>
						Title
					</label>
					<label>
						<input
							type="radio"
							value="ingredients"
							checked={filter === "ingredients"}
							name="search_type"
							onChange={handleCategoryChange}
						/>
						Ingredients
					</label>
					<label>
						<input
							type="radio"
							value="cuisine"
							checked={filter === "cuisine"}
							name="search_type"
							onChange={handleCategoryChange}
						/>
						Cuisine
					</label>
				</div>
			</div>
			<div>
				<div>
					<p className="text-xl font-bold my-3">All Recipes:</p>
					<button onClick={() => setOpenRecipeModal(true)}>Add Recipe</button>
				</div>

				<div className="flex gap-2 flex-wrap">
					{itemArr.map((recipe) => (
						<RecipeComponent key={recipe.id} recipeDetails={recipe} />
					))}
				</div>
			</div>
			<Modal isOpen={openRecipeModal} onClose={() => setOpenRecipeModal(false)}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form action={(e) => e.preventDefault()}>
							<input
								type="text"
								name="cuisine"
								value={formData.cuisine}
								placeholder="Enter cuisine name"
								onChange={handleFormOnChange}
							/>
							<input
								type="text"
								name="title"
								value={formData.title}
								placeholder="Enter Title"
								onChange={handleFormOnChange}
							/>
							<label>
								{" "}
								Ingredients:{" "}
								<input
									type="text"
									name="ingredients"
									value={textAreaData.ingredients}
									onChange={handleTextAreaOnChange}
									onKeyDown={handleAddTextAreaItem}
								/>
							</label>
							<label>
								{" "}
								Directions:{" "}
								<input
									type="text"
									name="directions"
									value={textAreaData.directions}
									onChange={handleTextAreaOnChange}
									onKeyDown={handleAddTextAreaItem}
								/>
							</label>
						</form>
					</ModalBody>

					<ModalFooter>
						<input
							type="file"
							onChange={(e) => {
								setFormData((prev) => ({
									...prev,
									image: URL.createObjectURL(e.target.files[0]),
								}));
							}}
						/>
						<Button colorScheme="blue" mr={3} onClick={addRecipe}>
							Save Recipe
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default HomePage;
