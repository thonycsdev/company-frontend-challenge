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
		await axios.delete('http://localhost:3000/api/companies', {
			data: { id: result.data.id }
		});
	});

	test('DELETE company', async () => {
		const create_company_payload: CompanyResquestType = {
			documento: faker.br.cnpj(),
			name: faker.company.companyName(),
			mailList: faker.internet.email(),
			contatosTecnicos: '[]',
			tecnologias: '[]'
		};
		const post_result = await axios.post(
			'http://localhost:3000/api/companies',
			create_company_payload
		);
		const payload = { id: post_result.data.id };
		const delete_result = await axios.delete(
			'http://localhost:3000/api/companies',
			{
				data: payload
			}
		);
		expect(delete_result.status).toBe(200);
	});
	test('UPDATE company', async () => {
		const create_company_payload: CompanyResquestType = {
			documento: faker.br.cnpj(),
			name: faker.company.companyName(),
			mailList: faker.internet.email(),
			contatosTecnicos: '[]',
			tecnologias: '[]'
		};
		const post_result = await axios.post(
			'http://localhost:3000/api/companies',
			create_company_payload
		);
		const update_company_payload: CompanyResquestType = {
			id: post_result.data.id,
			documento: faker.br.cnpj(),
			name: faker.company.companyName(),
			mailList: faker.internet.email(),
			contatosTecnicos: '[]',
			tecnologias: '[]'
		};
		const update_result = await axios.put(
			'http://localhost:3000/api/companies',
			update_company_payload
		);
		expect(update_result.status).toBe(200);
		expect(update_result.data.documento).toBe(update_company_payload.documento);
		expect(update_result.data.documento).not.toBe(
			create_company_payload.documento
		);

		await axios.delete('http://localhost:3000/api/companies', {
			data: { id: update_result.data.id }
		});
	});
});
