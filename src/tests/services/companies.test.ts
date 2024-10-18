import { axios_configuration } from '@/configurations/axiosConfiguration';
import { COMPANIES } from '@/constants/endpoints';
import axios from 'axios';

describe('Companies List', () => {
	test.skip('Request companies list', async () => {
		const response = await axios.get('http://localhost:3000/api/companies');
		expect(Array.isArray(response.data)).toBeTruthy();
		expect(response.status).toBe(200);
	});

	test('POST company', async () => {
		const payload: {
			documento: string;
			name: string;
			mailList: string;
			contatosTecnicos: string;
			tecnologias: string;
		} = {
			documento: '03.249.563/0001-06',
			name: 'Empresa Exemplo',
			mailList: 'cliente@dominio.com.br',
			contatosTecnicos: '[]',
			tecnologias: '[]'
		};

		try {
			const result = await axios_configuration.instance.post(
				COMPANIES.CREATE,
				payload
			);
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	});
});
