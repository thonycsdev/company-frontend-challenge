import { axios_instance } from '@/configurations/axiosConfiguration';
import { AUTH_AUTHENTICATE } from '@/constants/endpoints';
import { AuthResponseType, AuthTypeSignIn } from '@/types/auth.types';
import { AxiosResponse } from 'axios';

export async function signIn(
	payload: AuthTypeSignIn
): Promise<AxiosResponse<AuthResponseType>> {
	const response = await axios_instance.post<AuthResponseType>(
		AUTH_AUTHENTICATE,
		payload
	);
	return response;
}
