import { useAuth } from '@/context/authContext';
import { AuthTypeSignIn } from '@/types/auth.types';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

export default function Home() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { authenticate } = useAuth();
	const router = useRouter();
	const handleSignInClick = async () => {
		const payload: AuthTypeSignIn = {
			password,
			username,
			conId: 0
		};
		try {
			authenticate(payload).then(() => {
				alert('Welcome!');
				router.push('/companies');
				router.refresh();
			});
		} catch {
			alert('Login fail');
		}
	};

	const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setUsername(value);
	};
	const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setPassword(value);
	};
	return (
		<div className=" w-2/5 mx-auto mt-20 text-white font-bold bg-colorFullRed gap-2 flex flex-col p-5 rounded-xl">
			<label>Username</label>
			<input
				value={username}
				className="px-2 text-black font-sans"
				onChange={handleUsername}
			/>
			<label>Password</label>
			<input
				className="px-2 text-black font-sans"
				value={password}
				onChange={handlePassword}
			/>
			<button
				className="mt-3 bg-coolPink p-1 rounded-xl"
				onClick={handleSignInClick}
			>
				Sign In
			</button>
		</div>
	);
}
