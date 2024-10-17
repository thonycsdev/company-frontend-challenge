import { AuthTypeSignIn } from '@/types/auth.types';
import axios from 'axios';

describe('Auth tests', () => {
	test('Pass', async () => {
		const user_information: AuthTypeSignIn = {
			username: 'user1',
			password: '123456',
			conId: 0
		};
		const response = await axios.post(
			'http://localhost:3000/api/auth/authenticate',
			user_information
		);

		expect(response.status).toBe(200);
		expect(response.data).toBeDefined();
		expect(response.data.name).toBe('user1');
		expect(response.data.role).toBe('admin');
		expect(response.data.fullname).toBe('user1');
		expect(response.data.refreshToken).toBeDefined();
		expect(response.data.jwtToken).toBeDefined();
	});
});
