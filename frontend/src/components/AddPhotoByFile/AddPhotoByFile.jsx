/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";


import "./addPhotoByFile.css";
import useAddPhotoByFile from "./useAddPhotoByFile";

export default function AddPhotoByFile(props) {
	const {
		formContainer,
		handleSubmit,
		handleChange,
		inputFile,
		form,
		submitBtn,
		handleCancel,
	} = useAddPhotoByFile(props);

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
					<button ref={submitBtn} type='submit'>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
