import { signIn } from '@/services/auth';
import { AuthResponseType, AuthTypeSignIn } from '@/types/auth.types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<AuthResponseType>
) {
	if (req.method != 'POST') return res.status(403).end();
	const user_data = await signIn(req.body as AuthTypeSignIn);
	return res.status(200).json(user_data.data);
}
