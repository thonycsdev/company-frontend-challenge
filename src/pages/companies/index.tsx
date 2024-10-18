'use client';
import { AxiosConfigure } from '@/configurations/axiosConfiguration';
import { useAuth } from '@/context/authContext';
import { CompanyResponseType } from '@/types/company.types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TableComponent from '@/components/Table/TableComponent';

export default function Companies() {
	const { getUser } = useAuth();
	const router = useRouter();
	const [companies, setCompanies] = useState<CompanyResponseType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { public_instance } = new AxiosConfigure();
	const user = getUser();

	useEffect(() => {
		//Checks user authentication
		if (!user) {
			router.back();
		} else {
			fetchCompanies();
		}
	}, []);

	const handleDeleteClick = (id: number) => {
		setIsLoading(true);
		public_instance
			.delete('companies', { data: { id } })
			.then(() => {
				fetchCompanies();
			})
			.catch((e) => console.error(e))
			.finally(() => setIsLoading(false));
	};
	function fetchCompanies() {
		setIsLoading(true);
		public_instance
			.get('companies', {
				headers: {
					Authorization: `Bearer ${user?.jwtToken}`
				}
			})
			.then((c) => setCompanies(c.data))
			.finally(() => setIsLoading(false));
	}
	return (
		<div className="w-4/5 mx-auto p-5 flex justify-center flex-col">
			<button className="m-5 bg-coolPink p-1 rounded-xl w-48 text-white">
				Cadastrar Empresa
			</button>
			<TableComponent
				onDeleteClick={handleDeleteClick}
				isLoading={isLoading}
				companies={companies}
			/>
		</div>
	);
}
