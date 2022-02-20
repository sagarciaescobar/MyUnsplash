import React from "react";
import Modal from "../Modal/Modal";

import "./deleteImage.css";
import useDeleteImage from "./useDeleteImage";

export default function DeleteImage(props) {
	
	const {
        loadingDeleteImage,
        loadingUserToken,
        state,
        message,
        formContainer,
        handleChange,
        handleSubmit,
        formTitle,
        formDescription,
        formDeleteBtn,
        handleOver,
        formCancelBtn,
        handleClick
    } = useDeleteImage(props)

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
								<div></div>
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
