import React, { useState } from 'react'

export default function ImageBox(props) {
    const [image] = useState(props.imageData)
    return (
        <img className='box-img' src={image.urls.regular} alt={image.blur_hash}/>
    )
}