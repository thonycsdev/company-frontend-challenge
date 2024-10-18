import { axios_configuration } from '@/configurations/axiosConfiguration';
import { COMPANIES } from '@/constants/endpoints';
import { CompanyResponseType } from '@/types/company.types';
import { AxiosResponse } from 'axios';
import { IncomingHttpHeaders } from 'http';

export async function getAllCompanies(
	incoming_header: IncomingHttpHeaders
): Promise<AxiosResponse<CompanyResponseType>> {
	const url = process.env.API_URL + COMPANIES.LIST;
	try {
		console.log(incoming_header);
		axios_configuration.addBearerToken(incoming_header.authorization);
		const response = await axios_configuration.instance.get(url);
		return response.data;
	} catch (error) {
		throw error;
	}
}
