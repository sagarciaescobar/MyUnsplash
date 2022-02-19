/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import useApi from "../../Hook/useApi";
import "./addPhotoByUrl.css";

export default function AddPhotoByUrl({ handleCancel, setLoading, setError,setState }) {
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
	const submitBtn = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData();
		if (e.target[0].value !== "" || e.target[1].value !== "") {
			data.append("url", e.target[1].value);
			data.append("label", e.target[0].value);
			setLodingApi(true);
			setParams({
				method: "post",
				url: "/api/images/saveByUrl",
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
		if (response) {
			if(response.status === 201){
				setState("SUCCESSFULL")
				submitBtn.current.innerText = "Submited"
			}else{
				setState("ERROR")
			}
			setLoading(false)
		}
	}, [response]);

	useEffect(() => {
		setLoading(apiLoading);
		if(apiLoading){
			form.current.childNodes.forEach((ele,i)=>{
				if(i<=3){
					ele.style.display = "none"
				}
			})
			form.current.childNodes[4].childNodes[0].style.display = "none"
			form.current.style.height = "5rem"
			submitBtn.current.style.width = "100%"
			submitBtn.current.innerText = "Submiting"
		}else{
			form.current.childNodes.forEach((ele,i)=>{
				if(i<=3){
					ele.style.display = "block"
				}
			})
			form.current.style.height = "20rem"
			form.current.childNodes[4].childNodes[0].style.display = "block"
			submitBtn.current.style.width = "10rem"
			submitBtn.current.innerText = "Submit"
		}
	}, [apiLoading]);

	useEffect(() => {
		if (errorApi) setError(errorApi);
	}, [errorApi]);

	return (
		<div className='add_photo_options_container' style={{height: apiLoading ? "5rem":"20rem"}}>
			<form ref={form} onSubmit={handleSubmit} className='add_photo_url_container_form'>
				<label>Label</label>
				<input ref={inputLabel} type='text' placeholder='label' />
				<label>Photo url</label>
				<input ref={inputUrl} type='text' placeholder='url' />
				<div className='add_photo_url_container_form_btns'>
					<button type='button' onClick={handleCancel}>
						Cancel
					</button>
					<button ref={submitBtn} type='submit'>Submit</button>
				</div>
			</form>
		</div>
	);
}
