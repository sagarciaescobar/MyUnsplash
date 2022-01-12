/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import useApi from "../../Hook/useApi";
import Modal from "../Modal/Modal";

import "./deleteImage.css";

export default function DeleteImage(props) {
	const [state, setState] = useState({
		deletedImage: false,
		error: false,
	});
	const [formData, setFormData] = useState({ password: "" });

	const formContainer = useRef(null);
	const formTitle = useRef(null);
	const formDescription = useRef(null);
	const formCancelBtn = useRef(null);
	const formDeleteBtn = useRef(null);
	const message = useRef(null);

	const {
		response: userToken,
		loading: loadingUserToken,
		error: errorUserToken,
		setLoading: setLoadingUserToken,
		setParams: setParamsUserToken,
	} = useApi();
	const {
		response: deleteImage,
		loading: loadingDeleteImage,
		error: errorDeleteImage,
		setLoading: setLoadingDeleteImage,
		setParams: setParamsDeleteImage,
	} = useApi();

	const handleClick = () => {
		props.setShow((prev) => !prev);
	};

	const handleChange = (e) => {
		setFormData({ password: e.target.value });
	};

	const handleOver = () => {
		if (loadingDeleteImage || loadingUserToken) {
			formDeleteBtn.current.style.backgroundColor = "#e37b7b";
		}
		if(state.error){
			formDeleteBtn.current.style.backgroundColor = "#fff";
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (formData === null || formData.password !== "password") {
			const formInput = formContainer.current.childNodes[2];
			formInput.style.animation =
				"shake 1s linear 1 normal none, border_red 1s step-end 1 normal none";
			setTimeout(() => {
				formInput.style.animation = "none";
			}, 2000);
		} else {
			const data = new URLSearchParams();
			data.append("username", "default");
			data.append("password", formData.password);

			formContainer.current.style.justifyContent = "flex-end";
			formCancelBtn.current.style.display = "none";
			formDeleteBtn.current.style.width = "100%";
			formDeleteBtn.current.style.backgroundColor = "#e37b7b";
			formDeleteBtn.current.disabled = true;
			formDeleteBtn.current.innerText = "Deleting";
			formContainer.current.lastChild.style.justifyContent = "flex-start";

			setLoadingUserToken(true);
			setParamsUserToken({
				method: "POST",
				url: "/api/login",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				data: data,
			});
		}
	};

	useEffect(() => {
		if (userToken) {
			setLoadingDeleteImage(true);
			setParamsDeleteImage({
				method: "DELETE",
				url: `/api/images/${props.id}`,
				headers: {
					"Access-Control-Allow-Origin": "*",
					Authorization: "Bearer " + userToken.data.accessToken,
				},
			});
		}
	}, [userToken]);

	useEffect(() => {
		if (deleteImage) {
			if (deleteImage.status === 200) {
				formDeleteBtn.current.innerText = "Deleted successfully";
				formDeleteBtn.current.style.background = "none";
				formDeleteBtn.current.style.color ="#000";
				formDeleteBtn.current.style.boxShadow = "none";
				formDeleteBtn.current.style.outLine="none";
				state.deletedImage = true;
				setTimeout(() => {
					props.remove(props.id);
				}, 2500);
			}
			setTimeout(() => {
				props.setShow((prev) => !prev);
			}, 2000);
		}
	}, [deleteImage]);

	useEffect(() => {
		if (errorUserToken || errorDeleteImage) {
			formDeleteBtn.current.style.background = "none";
			formDeleteBtn.current.style.color = "black";
			formDeleteBtn.current.style.overflow = "hidden";
			formDeleteBtn.current.style.boxShadow = "none";
			formDeleteBtn.current.innerText = `Something happend, try again later`;
			setState(prev => { return { ...state, error:true}})
			setTimeout(() => {
				props.setShow((prev) => !prev);
			}, 2000);
		}
	}, [errorUserToken, errorDeleteImage]);

	useEffect(()=>{
		if(props.show===false){
			setState({
				deletedImage: false,
				error: false,
			})
		}
	},[props.show])

	return (
		<Modal show={props.show}>
			<div className='delete_modal_container'>
				<form
					ref={formContainer}
					className='delete_modal_container_form'
					onChange={handleChange}
					onSubmit={handleSubmit}>
					{state.deletedImage ||
					loadingDeleteImage ||
					loadingUserToken ||
					state.error ? (
						<div
							ref={message}
							className={`delete_modal_container_${
								state.error
									? "error"
									: loadingDeleteImage || loadingUserToken
									? "loading"
									: "successfull"
							}`}>
						</div>
					) : (
						<>
							<h3 ref={formTitle} className='delete_modal_container_title'>
								Delete Image
							</h3>
							<p
								ref={formDescription}
								className='delete_modal_container_description'>
								Please type <span>password</span> to confirm action of delete
							</p>
							<input
								id='delete_modal_container_input'
								className='delete_modal_container_input'
								type='text'
								name='password'
								placeholder='password'
								autoComplete='off'></input>
						</>
					)}
					<div className='delete_modal_container_btns'>
						<button ref={formDeleteBtn} onMouseOver={handleOver} type='submit'>
							Delete
						</button>
						<button ref={formCancelBtn} type='button' onClick={handleClick}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</Modal>
	);
}
