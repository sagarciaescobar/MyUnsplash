import React from "react";
import AddPhotoByFile from "../AddPhotoByFile/AddPhotoByFile";
import AddPhotoByUrl from "../AddPhotoByUrl/AddPhotoByUrl";
import Modal from "../Modal/Modal";
import useAddPhoto from "./useAddPhoto";


import { ReactComponent as UrlIcon } from "../../assets/public_icon.svg";
import { ReactComponent as UploadFileIcon } from "../../assets/upload_file_icon.svg";
import { ReactComponent as ArrowBackIcon } from "../../assets/arrow_back_icon.svg";
import { ReactComponent as CloseIcon } from "../../assets/close_white_icon.svg";

import "./addphoto.css";
import IconButton from "../IconButton/IconButton";

export default function AddPhoto(props) {
	const {
		addPhotoContainer,
		setLoading,
		loading,
		setState,
		state,
		handleGoBack,
		handleCancel,
		setError,
		error,
	} = useAddPhoto(props);

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
							<IconButton
								onClick={handleGoBack}
								icon={<ArrowBackIcon height='2.4rem' />}
							/>
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
					<div className='add_photo_error_container'>
						<div className='add_photo_container_error'></div>
						<p>
							{error.message}
							<br />
							Try again later
						</p>
					</div>
				)}
			</div>
		</Modal>
	);
}
