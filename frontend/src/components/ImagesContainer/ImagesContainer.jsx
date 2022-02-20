/* eslint-disable no-sparse-arrays */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import "./imagesContainer.css";
import ImageBox from "../ImageBox/ImageBox";
import useImagesContainer from "./useImagesContainer";

export default function ImagesContainer(props) {
	const { loadingImagesApi, images, handleRemove } = useImagesContainer(props);

	return loadingImagesApi ? (
		<p>cargando ...</p>
	) : (
		<div id='container' className='cols'>
			{images.map((image, i) => {
				return (
					<ImageBox
						imageData={image}
						key={image.fileId}
						remove={handleRemove}
					/>
				);
			})}
		</div>
	);
}
