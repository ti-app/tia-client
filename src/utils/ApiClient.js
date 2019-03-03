import axios from 'axios';
import config from '../config/common';

const apiClient = axios.create({
	baseUrl: config.api.base,
});

export default apiClient;
