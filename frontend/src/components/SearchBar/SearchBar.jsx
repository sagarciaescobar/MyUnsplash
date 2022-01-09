import React, { useState } from "react";

import "./searchBar.css";

import { ReactComponent as SearchIcon } from "../../assets/search_icon.svg";

export default function SearchBar() {

	const [showDropdown,setShowDropdown] = useState(false)

	const handleFocus = ()=>{
		setShowDropdown(prev => !prev)
	}

	return (
		<div className='search_bar_container'>
			<form className='search_bar_container_form' onFocus={handleFocus} onBlur={handleFocus}>
				<button className='search_bar_container_form_btn' type='submit'>
					<SearchIcon />
				</button>
				<input
					className='search_bar_container_form_input'
					placeholder='Search by label'
				/>
			</form>
			<ul className='search_bar_dropdown_search'style={{display:showDropdown ? "block":"none"}}>
				<li>
					<button type='button'>Esto es una busqueda</button>
				</li>
				<li>
					<button type='button'>Esto es una busqueda</button>
				</li>
				<li>
					<button type='button'>Esto es una busqueda</button>
				</li>
				<li>
					<button type='button'>Esto es una busqueda</button>
				</li>
			</ul>
		</div>
	);
}
