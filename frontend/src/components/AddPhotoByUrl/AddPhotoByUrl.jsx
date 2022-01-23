/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import useApi from "../../Hook/useApi";
import "./addPhotoByUrl.css";

export default function AddPhotoByUrl({ handleCancel, setLoading, setError }) {
	const {
		response,
		loading: apiLoading,
		setLoading: setLodingApi,
		error: errorApi,
		setParams,
	} = useApi();

	const form = useRef(null);

	const inputLabel = useRef(null);
	const inputUrl = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData();
		if (e.target[0].value !== "" || e.target[1].value !== "") {
			data.append("url", e.target[1].value);
			data.append("label", e.target[0].value);
			setLodingApi(true);
			setParams({
				method: "post",
				url: "/api/images/save",
				headers: {
					"Content-Type": `multipart/form-data; boundary=${data._boundary}`,
				},
				data: data,
			});
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
		if (response) console.log(response);
	}, [response]);

	useEffect(() => {
		setLoading(apiLoading);
	}, [apiLoading]);

	useEffect(() => {
		if (errorApi) setError(errorApi);
	}, [errorApi]);

	return (
		<div className='add_photo_options_container'>
			<form ref={form} onSubmit={handleSubmit} className='add_photo_url_container_form'>
				<label style={{display: apiLoading ? "none":"block"}}>Label</label>
				<input ref={inputLabel} style={{display: apiLoading ? "none":"block"}} type='text' placeholder='label' />
				<label style={{display: apiLoading ? "none":"block"}}>Photo url</label>
				<input style={{display: apiLoading ? "none":"block"}} ref={inputUrl} type='text' placeholder='url' />
				<div className='add_photo_url_container_form_btns'>
					<button style={{display: apiLoading ? "none":"inline-block"}} type='button' onClick={handleCancel}>
						Cancel
					</button>
					<button type='submit'>Submit</button>
				</div>
			</form>
		</div>
	);
}
