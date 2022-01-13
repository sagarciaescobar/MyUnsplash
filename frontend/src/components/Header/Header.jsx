import "./header.css";

import Logo from "../../assets/my_unsplash_logo.svg";
import SearchBar from "../SearchBar/SearchBar";
import AddPhoto from "../AddPhoto/AddPhoto";
import { useState } from "react";

export default function Header() {

	const [show, setShow] = useState(false)

	const handleClick = ()=>{
		setShow(prev => !prev)
	}

	return (
		<header className='header_container'>
			<img className='header_container_logo' src={Logo} alt='Logo unsplash' />
			<SearchBar />
			<button onClick={handleClick} className="header_container_btn" type='button'>Add a photo</button>
			<AddPhoto show={show} setShow={setShow}/>
		</header>
	);
}