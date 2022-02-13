import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./Layout/Layout";
import { useState } from "react";

function App() {

	const [filter,setFilter] = useState(undefined);
	const [labels,setLabels] = useState([]);

	return (
		<BrowserRouter>
			<Layout filter={filter} setFilter={setFilter} labels={labels}>
				<Routes>
					<Route path='/MyUnsplash/' element={<Home filter={filter} setLabels={setLabels} />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
