import React from "react";

export default function IconButton({onClick,icon}) {
	return (
		<button onClick={onClick}>
			<span className='material-icons'>
				{icon}
			</span>
		</button>
	);
}
