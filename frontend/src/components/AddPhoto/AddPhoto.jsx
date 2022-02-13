/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import AddPhotoByFile from "../AddPhotoByFile/AddPhotoByFile";
import AddPhotoByUrl from "../AddPhotoByUrl/AddPhotoByUrl";
import Modal from "../Modal/Modal";

import { ReactComponent as UrlIcon } from "../../assets/public_icon.svg";
import { ReactComponent as UploadFileIcon } from "../../assets/upload_file_icon.svg";
import { ReactComponent as ArrowBackIcon } from "../../assets/arrow_back_icon.svg";
import { ReactComponent as CloseIcon } from "../../assets/close_white_icon.svg";

import "./addphoto.css";
import IconButton from "../IconButton/IconButton";

export default function AddPhoto(props) {
	const [state, setState] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const addPhotoContainer = useRef(null);

	const handleGoBack = () => {
		setState(undefined);
	};

	const handleCancel = () => {
		setState(undefined);
		props.setShow(false);
	};

	useEffect(() => {
		if (loading) {
			addPhotoContainer.current.classList.add(
				"add_photo_container_loading_state"
			);
		}
		if (error) {
			setState("ERROR");
		}
	}, [loading]);

	useEffect(() => {
		if (state === "SUCCESSFULL") {
			setTimeout(() => {
				setState(undefined);
				props.setShow(false);
				console.log("recarga");
				window.location.reload();
			}, 2000);
		}
		if (state === "ERROR") {
			setTimeout(() => {
				setState(undefined);
				setError(false);
				props.setShow(false);
			}, 3000);
		}
	}, [state]);

	return (
		<Modal show={props.show}>
			<div ref={addPhotoContainer} className='add_photo_container'>
				<div
					style={{ display: loading ? "block" : "none" }}
					className='add_photo_container_loading'>
					<div></div>
				</div>
				<div
					style={{ display: loading ? "none" : "flex" }}
					className='add_photo_container_header'>
					<h3 className='add_photo_container_title'>Add a new photo</h3>
					{state ? (
						state === "SUCCESSFULL" || state === "ERROR" ? null : (
							<IconButton onClick={handleGoBack} icon={<ArrowBackIcon />} />
						)
					) : (
						<IconButton onClick={handleCancel} icon={<CloseIcon />} />
					)}
				</div>
				{state === undefined ? (
					<div className='add_photo_options_container'>
						<div className='add_photo_options_container_btns'>
							<button
								onClick={() => {
									setState("URL");
								}}
								className='add_photo_options_container_btns_option'>
								<UrlIcon />
								<p>By url</p>
							</button>
							<button
								onClick={() => {
									setState("FILE");
								}}
								className='add_photo_options_container_btns_option'>
								<UploadFileIcon />
								<p>By file</p>
							</button>
						</div>
					</div>
				) : state === "URL" ? (
					<AddPhotoByUrl
						handleCancel={handleCancel}
						setLoading={setLoading}
						setError={setError}
						setState={setState}
					/>
				) : state === "FILE" ? (
					<AddPhotoByFile
						handleCancel={handleCancel}
						setLoading={setLoading}
						setError={setError}
						setState={setState}
					/>
				) : state === "SUCCESSFULL" ? (
					<div className='add_photo_container_successfull'>
						<div></div>
					</div>
				) : (
					<div className="add_photo_error_container">
						<div className='add_photo_container_error'></div>
						<p>{error.message}<br/>Try again later</p>
					</div>
				)}
			</div>
		</Modal>
	);
}
