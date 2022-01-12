import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./Layout/Layout";
import axios from "axios";

function App() {

	axios.get('/');

	return (
		<Layout>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</BrowserRouter>
		</Layout>
	);
}

export default App;
