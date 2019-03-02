import axios from 'axios';
import config from '../config/common';

const apiClient = axios.create({
	baseUrl: config.api.base,
});

apiClient.interceptors.request.use(
	function(config) {
		// Do something before request is sent
		return config;
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
apiClient.interceptors.response.use(
	function(response) {
		// Do something with response data
		return response;
	},
	function(error) {
		// Do something with response error
		return Promise.reject(error);
	}
);

export default apiClient;
