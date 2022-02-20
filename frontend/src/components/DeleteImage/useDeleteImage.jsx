/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import useApi from "../../Hook/useApi";

export default function useDeleteImage (props){
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
			}, 1500);
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
			}, 1500);
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

    return {
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
    }
}