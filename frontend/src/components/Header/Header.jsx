import "./header.css";

import Logo from "../../assets/my_unsplash_logo.svg";
import SearchBar from "../SearchBar/SearchBar";

export default function Header({ user, setUser, logged, setLogged }) {
	return (
		<header className='header_container'>
			<img className='header_container_logo' src={Logo} alt='Logo unsplash' />
			<SearchBar />
			<button className="header_container_btn" type='button'>Add a photo</button>
		</header>
	);
}