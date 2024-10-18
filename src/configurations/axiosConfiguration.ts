import axios, { AxiosInstance } from 'axios';

export class AxiosConfigure {
	public instance: AxiosInstance;
	constructor() {
		this.instance = axios.create({
			baseURL: process.env.API_URL
		});
		if (process.env.NODE_ENV != 'production') {
			this.addBearerToken(process.env.TOKEN!);
		}
	}
	addBearerToken(token: string | undefined): void {
		if (token) {
			this.instance = axios.create({
				baseURL: process.env.API_URL,
				headers: { Authorization: `${token}` }
			});
		}
	}
}

export const axios_configuration = new AxiosConfigure();
