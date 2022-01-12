/* eslint-disable no-sparse-arrays */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import "./imagesContainer.css";

import ImageBox from "../ImageBox/ImageBox";
import useApi from "../../Hook/useApi";

export default function ImagesContainer() {

	const [images, setImages] = useState([]);
	const {
		response: dataImagesApi,
		error: errorImagesApi,
		loading: loadingImagesApi,
		setLoading: setLoadingImagesApi,
		setParams: setParamsImagesApi,
	} = useApi();

	useEffect(() => {
		setLoadingImagesApi(true);
		setParamsImagesApi({
			method: "GET",
			url: "/api/images/all",
		});
	},[]);

	useEffect(() => {
		if (dataImagesApi) {
			setImages(dataImagesApi.data);
		}
	}, [dataImagesApi]);

	const handleRemove = (id) =>{
		setImages(prev => prev.filter(img => img.fileId !== id))
	}


	return loadingImagesApi ? (
		<p>cargando ...</p>
	) : (
		<div id='container' className='cols'>
			{images.map((image, i) => {
				return <ImageBox imageData={image} key={image.fileId} remove={handleRemove}/>;
			})}
		</div>
	);
}
