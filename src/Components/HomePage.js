import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { BsSearch } from "react-icons/bs";
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
import { RxCross1 } from "react-icons/rx";

const HomePage = () => {
	const { recipeArr, setRecipeArr } = useContext(RecipeContext);
	const [itemArr, setItemArr] = useState([]);
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

	useEffect(() => {
		setItemArr(recipeArr);
	}, [recipeArr]);

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
			if (e.target.name === "ingredients") {
				setFormData((prev) => ({
					...prev,
					ingredients: [...prev.ingredients, e.target.value],
				}));
				setTextAreaData((prev) => ({
					...prev,
					ingredients: "",
				}));
			} else {
				setFormData((prev) => ({
					...prev,
					directions: [...prev.directions, e.target.value],
				}));
				setTextAreaData((prev) => ({
					...prev,
					directions: "",
				}));
			}
		}
	}

	function addRecipe() {
		setRecipeArr((prev) => [...prev, { id: uuidv4(), ...formData }]);
		setOpenRecipeModal(false);
		setFormData({
			cuisine: "",
			title: "",
			ingredients: [],
			directions: [],
			image: "",
		});
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

	function deleteStep(name, id) {
		console.log(name, id);
		if (name === "ingredients") {
			setFormData((prev) => ({
				...prev,
				ingredients: prev.ingredients.filter((item, idx) => idx !== id),
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				directions: prev.directions.filter((item, idx) => idx !== id),
			}));
		}
	}

	return (
		<div className="p-3 ">
			<p className="text-4xl font-bold p-4 text-center border-b-2 border-gray-300 rounded-sm mb-3">
				Let's Cook
			</p>
			<div className="flex gap-2 items-center justify-center p-3">
				<div className="flex gap-2 items-center border border-black rounded-md p-1 px-2 mr-3 w-[30%]">
					<BsSearch size={20} />
					<input
						type="search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder={`search recipe based on its ${filter} ...`}
						className="w-full focus:outline-none"
					/>
				</div>
				<div className="flex gap-2 items-center cursor-pointer">
					<label>
						<input
							type="radio"
							value="title"
							checked={filter === "title"}
							name="search_type"
							className="cursor-pointer mr-1"
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
							className="cursor-pointer mr-1"
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
							className="cursor-pointer mr-1"
							onChange={handleCategoryChange}
						/>
						Cuisine
					</label>
				</div>
			</div>
			<div className="p-3">
				<div className="flex items-center justify-between">
					<p className="text-2xl font-bold my-3">All Recipes:</p>
					<button
						className="bg-blue-400 text-white px-3 py-1 rounded-md"
						onClick={() => setOpenRecipeModal(true)}
					>
						Add Recipe
					</button>
				</div>

				<div className="flex gap-4 flex-wrap justify-center">
					{itemArr?.map((recipe) => (
						<RecipeComponent key={recipe.id} recipeDetails={recipe} />
					))}
				</div>
			</div>
			<Modal
				isOpen={openRecipeModal}
				onClose={() => setOpenRecipeModal(false)}
				scrollBehavior="inside"
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create Your Recipe</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form
							action={(e) => e.preventDefault()}
							className="flex flex-col gap-2"
						>
							<input
								type="text"
								name="cuisine"
								value={formData.cuisine}
								placeholder="Enter cuisine name"
								onChange={handleFormOnChange}
								className="border p-1 rounded-md"
							/>
							<input
								type="text"
								name="title"
								value={formData.title}
								placeholder="Enter Title"
								onChange={handleFormOnChange}
								className="border p-1 rounded-md"
							/>
							<label>
								Ingredients:{" "}
								<input
									type="text"
									name="ingredients"
									value={textAreaData.ingredients}
									onChange={handleTextAreaOnChange}
									onKeyDown={handleAddTextAreaItem}
									className="border p-1 rounded-md"
								/>
							</label>
							<div className="flex gap-2 flex-col">
								{formData.ingredients?.map((item, idx) => (
									<li key={idx}>
										{item}
										<RxCross1
											size={12}
											className="inline ml-1 cursor-pointer"
											onClick={() => deleteStep("ingredients", idx)}
										/>
									</li>
								))}
							</div>
							<label>
								Directions:{" "}
								<input
									type="text"
									name="directions"
									value={textAreaData.directions}
									onChange={handleTextAreaOnChange}
									onKeyDown={handleAddTextAreaItem}
									className="border p-1 rounded-md"
								/>
							</label>
							<div className="flex gap-2 flex-col">
								{formData.directions?.map((item, idx) => (
									<li key={idx}>
										{item}
										<RxCross1
											size={12}
											className="inline ml-1 cursor-pointer"
											onClick={() => deleteStep("directions", idx)}
										/>
									</li>
								))}
							</div>
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
