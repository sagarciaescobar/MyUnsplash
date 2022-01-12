import ReactDOM from "react-dom";

import "./modal.css";

export default function Modal(props) {

	const body=document.querySelector("body")

	if (props.show) {
		return ReactDOM.createPortal(
			<div className='Modal'>{props.children}</div>,
			document.getElementById("modal")
		);
	} else {
		return null;
	}
}
