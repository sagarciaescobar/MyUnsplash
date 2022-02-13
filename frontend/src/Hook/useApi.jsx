import { useState, useEffect } from "react";
import axios from "axios";

const useApi = () => {
	axios.defaults.baseURL = "https://myunsplash-app.herokuapp.com/";

	const [response, setResponse] = useState(undefined);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [params, setParams] = useState(undefined);

	const fetchData = async (params) => {
		if (params !== undefined) {
			try {
				const result = await axios.request(params);
				setResponse(result);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		fetchData(params);
	}, [params]);

	return { response, error, loading, setLoading, setParams };
};

export default useApi;
