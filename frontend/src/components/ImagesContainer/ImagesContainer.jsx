import React, { useEffect, useState } from "react";

import "./imagesContainer.css";

import Images from "../../assets/images.json";
import ImageBox from "../ImageBox/ImageBox";

export default function ImagesContainer() {
	
	const [images, setImages] = useState([]);

	useEffect(() => {
		setImages(Images)
	}, [])

	console.log(images)

	return (
		<div id='container' className='cols'>
			{images.map((image,i)=>{
				return <ImageBox imageData={image} key={i} />
			})}
		</div>
	);
}
