import { CompanyResquestType } from '@/types/company.types';
var faker = require('faker-br');
import axios from 'axios';

describe('Companies List', () => {
	test('Request companies list', async () => {
		const response = await axios.get('http://localhost:3000/api/companies');
		expect(Array.isArray(response.data)).toBeTruthy();
		expect(response.status).toBe(200);
	});

	test('POST company', async () => {
		const payload: CompanyResquestType = {
			documento: faker.br.cnpj(),
			name: faker.company.companyName(),
			mailList: faker.internet.email(),
			contatosTecnicos: '[]',
			tecnologias: '[]'
		};
		const result = await axios.post(
			'http://localhost:3000/api/companies',
			payload
		);
		expect(result.status).toBe(201);
		expect(result.data.documento).toBe(payload.documento);
	});
});
