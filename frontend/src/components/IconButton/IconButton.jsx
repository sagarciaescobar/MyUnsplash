import React from "react";

export default function IconButton({onClick,icon}) {
	return (
		<button onClick={onClick}>
			<span>
				{icon}
			</span>
		</button>
	);
}
