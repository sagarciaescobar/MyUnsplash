import React from "react";

import "./addPhotoByUrl.css";
import useAddPhotoByUrl from "./useAddPhotoByUrl";

export default function AddPhotoByUrl(props) {
	
	const {
        apiLoading,
        form,
        handleSubmit,
        inputLabel,
        inputUrl,
        handleCancel,
        submitBtn
    } = useAddPhotoByUrl(props)

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
