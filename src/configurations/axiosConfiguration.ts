import axios from 'axios';

export const axios_instance = axios.create({
	baseURL: process.env.API_URL
});
