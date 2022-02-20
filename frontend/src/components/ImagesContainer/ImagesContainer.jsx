/* eslint-disable no-sparse-arrays */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import "./imagesContainer.css";

import ImageBox from "../ImageBox/ImageBox";
import useApi from "../../Hook/useApi";

export default function ImagesContainer({filter ,setLabels}) {

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
			setLabels(dataImagesApi.data.map(img =>img.label))
		}
	}, [dataImagesApi]);

	useEffect(()=>{
		if(filter){
			const listImageFiltered = dataImagesApi.data.filter(img=>img.label.includes(filter))
			setImages(listImageFiltered)
		}
		if(filter === undefined){
			if(dataImagesApi)setImages(dataImagesApi.data)
		}
	},[filter])

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
