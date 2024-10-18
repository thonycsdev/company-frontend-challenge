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
		public_instance
			.get('companies', {
				headers: {
					Authorization: `Bearer ${user?.jwtToken}`
				}
			})
			.then((c) => setCompanies(c.data));
	}
	return (
		<TableComponent
			onDeleteClick={handleDeleteClick}
			isLoading={isLoading}
			companies={companies}
		/>
	);
}
