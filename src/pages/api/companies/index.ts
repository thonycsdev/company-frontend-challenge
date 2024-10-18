import { createCompany, getAllCompanies } from '@/services/company';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const response = await getAllCompanies(req.headers);
		res.status(200).json(response);
	}

	if (req.method === 'POST') {
		const result = await createCompany(req.body, req.headers);
		res.status(201).json(result);
	}

	res.status(403).end();
}
