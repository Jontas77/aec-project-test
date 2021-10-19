/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";


const Upload = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		if (selectedImage) {
			setImageUrl(URL.createObjectURL(selectedImage));
		}
	}, [selectedImage]);
console.log(imageUrl);
console.log(selectedImage.name);
	return (
		<>
			<input
				accept="image/*"
				type="file"
				id="select-image"
				style={{ display: "none" }}
				onChange={(e) => setSelectedImage(e.target.files[0])}
			/>
			<label htmlFor="select-image">
				<Button variant="contained" color="primary" component="span">
					Upload Image
				</Button>
			</label>
            {imageUrl && selectedImage && (
                <Box mt={2} textAlign="center">
                    <div><h2>Image Preview:</h2></div>
                    <img src={imageUrl} alt={selectedImage.name} height="200px" />
                </Box>
            )}
		</>
	);
};

export default Upload;
