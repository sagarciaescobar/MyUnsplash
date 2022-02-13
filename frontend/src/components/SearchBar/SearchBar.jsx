/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";

import "./searchBar.css";

import { ReactComponent as SearchIcon } from "../../assets/search_icon.svg";

export default function SearchBar({ filter, setFilter, labels }) {
	const [showDropdown, setShowDropdown] = useState(false);
	const [state, setState] = useState("");
	const [filteredLabels, setFilteredLabels] = useState([]);
	const btn = useRef(null);

	const handleFocus = () => {
		if(showDropdown){
			setTimeout(()=>{
				setShowDropdown((prev) => !prev);
			},100)
		}else{
			setShowDropdown((prev) => !prev);
		}
	};

	const handleChange = (e) => {
		setState(e.target.value);
	};

	const handleClick = (label)=>{
		setState(label)
		setTimeout(()=>{
			btn.current.click()
		},100)
	}

	const handleSubmit =(e)=>{
		e.preventDefault()
		setFilter(state)
	}

	useEffect(() => {
		if (state !== "") {
			const filterArray = labels
				.filter((label) => label.includes(state))
				.filter((l, i) => i < 5);
			setFilteredLabels(filterArray);
		}
	}, [state]);

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
