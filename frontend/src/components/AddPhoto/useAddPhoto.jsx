/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";

export default function useAddPhoto(props) {
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

	return {
		addPhotoContainer,
        setLoading,
		loading,
        setState,
		state,
		handleGoBack,
		handleCancel,
        setError,
		error,
	};
}
