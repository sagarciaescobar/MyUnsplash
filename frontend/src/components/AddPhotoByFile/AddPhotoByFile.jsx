/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import useApi from "../../Hook/useApi";

import "./addPhotoByFile.css";

export default function AddPhotoByFile({ handleCancel, setLoading, setError,setState }) {
	const [form, setForm] = useState({ label: "", file: null });

	const {
		response,
		loading: apiLoading,
		setLoading: setLoadingApi,
		error: errorApi,
		setParams,
	} = useApi();

	const formContainer = useRef(null);
	const inputFile = useRef(null);
	const submitBtn = useRef(null)

	const handleChange = (e) => {
		if(e.target.name === "label"){
			setForm(prev => {return { ...prev, label: e.target.value}});
		}
		if (e.target.files !== null) {
			if (/^image*\w+/gi.test(e.target.files[0].type)) {
				setForm((prev) => {
					return { ...prev, file: e.target.files[0] };
				});
			}
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(form)
		const data = new FormData();
		if (form.label !== "" && form.file !== null) {
			data.append("label", form.label);
			data.append("file", form.file);
			console.log(form.file) 
			setLoadingApi(true);
			setParams({
				method: "post",
				url: "/api/images/saveByFile",
				headers: {
					"Content-Type": `multipart/form-data`,
				},
				data: data,
			});
		} else {
			if (form.label === "") {
				formContainer.current.childNodes[1].style.animation =
					"shake 1s linear 1 normal none, border_red 1s step-end 1 normal none";
			}
			if (form.file === null) {
				formContainer.current.childNodes[4].style.animation =
					"shake 1s linear 1 normal none, border_file 1s step-end 1 normal none";
			}
			setTimeout(() => {
				formContainer.current.childNodes[1].style.animation = "none";
				formContainer.current.childNodes[4].style.animation = "none";
			}, 100000);
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
			formContainer.current.childNodes.forEach((ele,i)=>{
				if(i<=4){
					ele.style.display = "none"
				}
			})
			formContainer.current.childNodes[5].childNodes[0].style.display = "none"
			formContainer.current.style.height = "5rem"
			submitBtn.current.style.width = "100%"
			submitBtn.current.innerText = "Submiting"
		}else{
			formContainer.current.childNodes.forEach((ele,i)=>{
				if(i<=4){
					ele.style.display = "block"
				}
			})
			inputFile.current.style.display= "none"
			formContainer.current.style.height = "20rem"
			formContainer.current.childNodes[5].childNodes[0].style.display = "block"
			submitBtn.current.style.width = "10rem"
			submitBtn.current.innerText = "Submit"
		}
	}, [apiLoading]);

	useEffect(() => {
		if (errorApi) setError(errorApi);
	}, [errorApi]);

	return (
		<div className='add_photo_options_container'>
			<form
				ref={formContainer}
				onSubmit={handleSubmit}
				onChange={handleChange}
				className='add_photo_file_container_form'>
				<label htmlFor='label'>Label</label>
				<input name='label' type='text' placeholder='label' />
				<label>Photo url</label>
				<input
					ref={inputFile}
					style={{ display: "none" }}
					name='file'
					type='file'
					placeholder='url'
					accept='image/*'
				/>
				<button
					onClick={() => {
						inputFile.current.click();
					}}
					type='button'
					className='add_photo_file_container_form_inputfile'>
					{form.file ? form.file.name : "Examinar"}
				</button>
				<div className='add_photo_file_container_form_btns'>
					<button type='button' onClick={handleCancel}>
						Cancel
					</button>
					<button ref={submitBtn} type='submit'>Submit</button>
				</div>
			</form>
		</div>
	);
}
