import React, { useState } from "react";
import AddPhotoByFile from "../AddPhotoByFile/AddPhotoByFile";
import AddPhotoByUrl from "../AddPhotoByUrl/AddPhotoByUrl";
import Modal from "../Modal/Modal";

import { ReactComponent as UrlIcon } from "../../assets/public_icon.svg";
import { ReactComponent as UploadFileIcon } from "../../assets/upload_file_icon.svg";
import { ReactComponent as ArrowBackIcon } from "../../assets/arrow_back_icon.svg";
import { ReactComponent as CloseIcon} from '../../assets/close_white_icon.svg'

import "./addphoto.css";

export default function AddPhoto(props) {
	const [state, setState] = useState(undefined);
	const [loading,setLoading] = useState(false);

	const handleGoBack = () => {
		setState(undefined);
	};

	const handleCancel = () => {
		setState(undefined);
		props.setShow(false);
	};

	return (
		<Modal show={props.show}>
			<div className='add_photo_container'>
				<div className='add_photo_container_header'>
					<h3 className='add_photo_container_title'>Add a new photo</h3>
					{state ? (
						<button onClick={handleGoBack}>
							<span className='material-icons'>
								<ArrowBackIcon />
							</span>
						</button>
					) : (
						<button onClick={handleCancel}>
							<span className='material-icons'>
								<CloseIcon />
							</span>
						</button>
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
					<AddPhotoByUrl handleCancel={handleCancel} />
				) : (
					<AddPhotoByFile handleCancel={handleCancel} />
				)}
			</div>
		</Modal>
	);
}
