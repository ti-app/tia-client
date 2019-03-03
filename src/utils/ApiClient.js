import axios from 'axios';
import commonConfig from '../config/common';

const apiClient = (config) => axios({ baseURL: commonConfig.api.base, ...config });

export default apiClient;
