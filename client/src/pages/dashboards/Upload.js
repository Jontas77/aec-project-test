/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";

const Upload = () => {
	const [selectedImage, setSelectedImage] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	const uploadImage = async (e) => {
		try {
			const file = e.target.files[0];
			const formData = new FormData();
			formData.append("image", file);

			const response = await fetch("/api/image", {
				method: "POST",
				headers: { token: localStorage.token },
				body: formData,
			});

			const parseResponse = await response.json();

			setSelectedImage(parseResponse.filename);
		} catch (error) {
			console.error(error.message);
		}
	};

	const getImage = async (file) => {
		try {
			const response = await fetch(`/api/image/${file}`, {
				method: "GET",
				headers: { token: localStorage.token },
			});

			setImageUrl(response.url);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		if (selectedImage) {
			getImage(selectedImage);
		}
	}, [selectedImage]);

	return (
		<>
			<input
				accept="image/*"
				type="file"
				id="select-image"
				style={{ display: "none" }}
				onChange={(e) => uploadImage(e)}
			/>
			<label htmlFor="select-image">
				<Button variant="contained" color="primary" component="span">
					Upload Image
				</Button>
			</label>
			{imageUrl && selectedImage && (
				<Box mt={2} textAlign="center">
					<div>
						<h2>Image Preview:</h2>
					</div>
					<img src={imageUrl} alt={selectedImage} height="200px" />
				</Box>
			)}
		</>
	);
};

export default Upload;
