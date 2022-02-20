/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import "./searchBar.css";

import { ReactComponent as SearchIcon } from "../../assets/search_icon.svg";
import useSearchBar from "./useSearchBar";

export default function SearchBar(props) {

	const {
        handleChange,
		handleSubmit,
        handleClick,
        handleFocus,
        btn,
        state,
        showDropdown,
        filteredLabels
    }= useSearchBar(props)

	return (
		<div className='search_bar_container'>
			<form 
				onSubmit={handleSubmit}
				className='search_bar_container_form'
				onFocus={handleFocus}
				onBlur={handleFocus}>
				<button ref={btn} className='search_bar_container_form_btn' type='submit'>
					<SearchIcon />
				</button>
				<input
					className='search_bar_container_form_input'
					placeholder='Search by label'
					value={state}
					onChange={handleChange}
				/>
			</form>
			<ul
				className='search_bar_dropdown_search'
				style={{ display: showDropdown ? "block" : "none" }}>
				{filteredLabels.map((label,i) => {
					return (
						<li key={`searchlabel${i}`}>
							<button onClick={()=>{handleClick(label)}} type='button'>{label}</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
