/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

export default function useSearchBar({ filter, setFilter, labels }){
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
		}else{
			setFilter(undefined)
		}
	}, [state]);

    return {
        handleChange,
        handleSubmit,
        handleClick,
        handleFocus,
        btn,
        state,
        showDropdown,
        filteredLabels
    }
}