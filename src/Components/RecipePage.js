import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
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

const RecipePage = () => {
	const [openEditModal, setOpenEditModal] = useState(false);
	const [formData, setFormData] = useState({
		cuisine: "",
		title: "",
	});
	const { recipeId } = useParams();
	const { recipeArr, SetRecipeArr } = useContext(RecipeContext);
	const recipeDetails = recipeArr?.find((recipe) => recipe.id === recipeId);

	const { id, directions, ingredients, cuisine, title, image } = recipeDetails;

	return (
		<div className="flex flex-col items-center p-6">
			<p className="text-xl font-bold text-center mb-4">{title}</p>
			<div className="flex border-2 rounded-md gap-4 w-[80%] items-center p-3">
				<div className="w-[40%]">
					<img className="w-full" src={image} alt="" />
				</div>
				<div className="w-[60%]">
					<div className="w-full flex justify-end border-2">
						<button
							className="bg-blue-800 text-white p-1 px-2"
							onClick={() => setOpenEditModal(true)}
						>
							Edit
						</button>
					</div>
					<p className="font-bold">Cuisine: {cuisine} </p>
					<p>
						<span className="font-semibold">Ingredients:</span> {ingredients}
					</p>
					<p className="font-semibold"> Instructions:</p>
					<ul>
						{directions?.map((step, idx) => (
							<li key={idx}>
								<span className="font-bold">{idx + 1}. </span>
								{step}
							</li>
						))}
					</ul>
				</div>
			</div>
			<Modal isOpen={openEditModal} onClose={() => setOpenEditModal(false)}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form action="">
							<input type="text" />
						</form>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() => setOpenEditModal(false)}
						>
							Close
						</Button>
						<Button variant="ghost">Secondary Action</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default RecipePage;
