import React, { useRef,useEffect } from "react";

import useApi from "../../Hook/useApi";

import "./addPhotoByUrl.css";

export default function AddPhotoByUrl({ handleCancel }) {
	const { response, loading, setLoading, error, setParams } = useApi();

	const inputLabel = useRef(null);
	const inputUrl = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (e.target[0].value !== "" || e.target[1].value !== "") {
			const data = new FormData();
			data.append("label",e.target[0].value)
			data.append("url",e.target[1].value)
			setParams({
				method:"POST",
				url:"/api/images/save",
				headers:{
					"Content-Type":"multipart/form-data"
				},
				data:data
			})
		} else {
			if (e.target[0].value === "") {
				inputLabel.current.style.animation =
					"shake 1s linear 1 normal none, border_red 1s step-end 1 normal none";
			}
			if (e.target[1].value === "") {
				inputUrl.current.style.animation =
					"shake 1s linear 1 normal none, border_red 1s step-end 1 normal none";
			}
			setTimeout(() => {
				inputUrl.current.style.animation = "none";
				inputLabel.current.style.animation = "none";
			}, 2000);
		}
	};

	useEffect(() => {
		if(response)console.log(response)
	}, [response])

	useEffect(()=>{},[error])

	return (
		<div className='add_photo_options_container'>
			<form onSubmit={handleSubmit} className='add_photo_url_container_form'>
				<label>Label</label>
				<input ref={inputLabel} type='text' placeholder='label' />
				<label>Photo url</label>
				<input ref={inputUrl} type='text' placeholder='url' />
				<div className='add_photo_url_container_form_btns'>
					<button type='button' onClick={handleCancel}>
						Cancel
					</button>
					<button type='submit'>Submit</button>
				</div>
			</form>
		</div>
	);
}
