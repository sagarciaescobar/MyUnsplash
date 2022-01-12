import React, { useState } from "react";
import DeleteImage from "../DeleteImage/DeleteImage";

import "./imageBox.css";

export default function ImageBox(props) {
	const [image] = useState(props.imageData);
    const [showLabel,setShowLabel] = useState(false);
    const [showDeleteModal,setShowDeleteModal] = useState(false);

    const handleClick = ()=>{
        setShowDeleteModal(prev => !prev)
        setShowLabel(false)
    }
    const handleOnTouch = ()=>{
        setShowLabel(true)
        setTimeout(()=>{setShowLabel(false)},2000)
    }

	return (
		<div className='box_img' onTouchStart={handleOnTouch} onMouseLeave={()=>{setShowLabel(false)}} onMouseEnter={()=>{setShowLabel(true)}}>
			<img src={image.fileUrl} alt={image.label} />
			<button onClick={handleClick} className='box_img_delete_btn' style={{display:showLabel? "block": "none"}}>Delete</button>
			<p className='box_img_label' style={{display:showLabel? "block": "none"}}>{image.label}</p>
            <DeleteImage show={showDeleteModal} setShow={setShowDeleteModal} id={image.fileId} remove={props.remove}/>
		</div>
	);
}