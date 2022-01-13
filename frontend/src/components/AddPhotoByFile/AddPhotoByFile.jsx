import React, { useRef, useState } from "react";
import useApi from "../../Hook/useApi";

import "./addPhotoByFile.css";

export default function AddPhotoByFile({ handleCancel }) {
	const [file, setFile] = useState(null);

	const { response, loading, setLoading, error, setParams } = useApi();

	const inputFile = useRef(null);

	const handleChange = (e) => {
		e.preventDefault();
		if (/^image*\w+/gi.test(e.target.files[0].type)) {
			setFile(e.target.files[0]);
		}
	};

	return (
		<div className='add_photo_options_container'>
			<form onChange={handleChange} className='add_photo_file_container_form'>
				<label>Label</label>
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
					{file ? file.name : "Examinar"}
				</button>
				<div className='add_photo_file_container_form_btns'>
					<button type='button' onClick={handleCancel}>
						Cancel
					</button>
					<button type='submit'>Submit</button>
				</div>
			</form>
		</div>
	);
}
