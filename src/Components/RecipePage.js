import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Link, useParams } from "react-router-dom";
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
import { BiArrowBack } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { RecipeContext } from "../Context";

const RecipePage = () => {
	const [openEditModal, setOpenEditModal] = useState(false);

	const { recipeId } = useParams();
	const { recipeArr, setRecipeArr } = useContext(RecipeContext);
	const recipeDetails = recipeArr?.find((recipe) => recipe.id === recipeId);
	const { directions, ingredients, cuisine, title, image } = recipeDetails;

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
		if (e.key === "Enter" && e.target.value.trim() !== "") {
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
		setOpenEditModal(false);
		setFormData({
			cuisine: "",
			title: "",
			ingredients: [],
			directions: [],
			image: "",
		});
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
		<div className="flex flex-col items-center p-6">
			<div className="flex gap-3 items-start  w-full">
				<Link to="/">
					<BiArrowBack size={30} />
				</Link>
				<p className="text-xl md:text-3xl font-bold mx-auto mb-4">{title}</p>
			</div>
			<div className="flex flex-col lg:flex-row border-2 rounded-md gap-4 w-[90%] md:w-[60%] lg:w-[80%] p-3">
				<div className="lg:w-[40%]">
					<img className="w-full" src={image} alt="" />
				</div>
				<div className="lg:w-[60%] flex flex-col gap-2">
					<div className="flex items-center justify-between my-2">
						<p className="text-2xl font-bold">{cuisine}</p>

						<button
							className="bg-blue-800 text-white p-1 px-3 rounded-md "
							onClick={() => {
								setFormData({
									cuisine: cuisine,
									title: title,
									ingredients: ingredients,
									directions: directions,
									image: image,
								});
								setOpenEditModal(true);
							}}
						>
							Edit
						</button>
					</div>

					<p>
						<span className="font-bold text-lg mr-1">Ingredients:</span>
						{ingredients.join(", ")}
					</p>
					<p className="font-bold text-lg mr-1"> Instructions:</p>
					<ul>
						{directions?.map((step, idx) => (
							<li key={idx}>
								<span className="font-bold">{idx + 1}. </span>
								<span>{step}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
			<Modal
				isOpen={openEditModal}
				onClose={() => setOpenEditModal(false)}
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

export default RecipePage;
