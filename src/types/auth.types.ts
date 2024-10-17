export type AuthTypeSignIn = {
	username: string;
	password: string;
	conId: 0;
};

export type AuthResponseType = {
	id: number;
	jwtToken: string;
	refreshToken: string;
	name: string;
	role: string;
	fullname: string;
};
