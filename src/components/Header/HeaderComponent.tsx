import { useAuth } from '@/context/authContext';
import { AuthResponseType } from '@/types/auth.types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function HeaderComponent() {
	const { getUser, logout } = useAuth();
	const [user, setUser] = useState<AuthResponseType | undefined>(undefined);
	const router = useRouter();
	useEffect(() => {
		setUser(getUser());
	}, []);
	const handleLogout = () => {
		logout();
		router.push('/');
		router.reload();
	};
	return (
		<div className="text-white flex items-center justify-between px-10 w-full h-10 bg-colorFullRed sticky top-0 rounded-b-xl z-10">
			<div>Anthony Coutinho Challenge</div>
			{user && (
				<div className="flex justify-evenly w-48">
					<div>{user!.fullname}</div>
					<div
						onClick={handleLogout}
						className="underline hover:scale-105 hover:cursor-pointer"
					>
						Logout
					</div>
				</div>
			)}
		</div>
	);
}
