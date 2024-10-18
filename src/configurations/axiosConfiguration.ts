import axios, { AxiosInstance } from 'axios';

export class AxiosConfigure {
	public instance: AxiosInstance;
	public public_instance: AxiosInstance;
	constructor() {
		this.public_instance = axios.create({
			baseURL: process.env.NEXT_PUBLIC_URL
		});
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
