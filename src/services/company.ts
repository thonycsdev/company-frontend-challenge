import { axios_configuration } from '@/configurations/axiosConfiguration';
import { COMPANIES } from '@/constants/endpoints';
import {
	CompanyResponseType,
	CompanyResquestType
} from '@/types/company.types';
import { AxiosResponse } from 'axios';
import { IncomingHttpHeaders } from 'http';

export async function getAllCompanies(
	incoming_header: IncomingHttpHeaders
): Promise<AxiosResponse<CompanyResponseType[]>> {
	const url = process.env.API_URL + COMPANIES.LIST;
	try {
		axios_configuration.addBearerToken(incoming_header.authorization);
		const response = await axios_configuration.instance.get(url);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function createCompany(
	payload: CompanyResquestType,
	incoming_header: IncomingHttpHeaders
): Promise<AxiosResponse<CompanyResponseType>> {
	axios_configuration.addBearerToken(incoming_header.authorization);
	try {
		const result = await axios_configuration.instance.post(
			COMPANIES.CREATE,
			payload
		);
		return result.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function deleteCompany(
	payload: { id: number },
	incoming_header: IncomingHttpHeaders
) {
	try {
		axios_configuration.addBearerToken(incoming_header.authorization);
		const delete_result = await axios_configuration.instance.put(
			process.env.API_URL + COMPANIES.DELETE,
			payload
		);
		return delete_result.status;
	} catch (error) {
		console.error(error);
	}
}
export async function updateCompany(
	payload: CompanyResquestType,
	incoming_header: IncomingHttpHeaders
) {
	try {
		axios_configuration.addBearerToken(incoming_header.authorization);
		const delete_result = await axios_configuration.instance.post(
			process.env.API_URL + COMPANIES.UPDATE,
			payload
		);
		return delete_result.data;
	} catch (error) {
		console.error(error);
	}
}
