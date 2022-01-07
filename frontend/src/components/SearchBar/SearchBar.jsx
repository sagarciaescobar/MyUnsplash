import React from "react";

import "./searchBar.css";

import { ReactComponent as SearchIcon } from "../../assets/search_icon.svg";

export default function SearchBar() {
	return (
		<div className='search_bar_container'>
			<form className='search_bar_container_form'>
				<button className='search_bar_container_form_btn' type='submit'>
					<SearchIcon />
				</button>
				<input
					className='search_bar_container_form_input'
					placeholder='Search by label'
				/>
			</form>
		</div>
	);
}
