import { getAllCompanies } from '@/services/company';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		console.log('Received');
		const response = await getAllCompanies(req.headers);
		res.status(200).json(response);
	}

	res.status(403).end();
}
