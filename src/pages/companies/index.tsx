'use client';
import { AxiosConfigure } from '@/configurations/axiosConfiguration';
import { useAuth } from '@/context/authContext';
import { CompanyResponseType } from '@/types/company.types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TableComponent from '@/components/Table/TableComponent';
import ModalComponent from '@/components/Modal/ModalComponent';
import ModalEditComponent from '@/components/Modal/ModalEditComponent';

export default function Companies() {
	const { getUser } = useAuth();
	const router = useRouter();
	const [companies, setCompanies] = useState<CompanyResponseType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalEditOpen, setIsModalEditOpen] = useState(false);
	const [companyToEdit, setCompanyToEdit] = useState<
		CompanyResponseType | undefined
	>();
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

	const handleEditClick = (company_to_edit: CompanyResponseType) => {
		setCompanyToEdit(company_to_edit);
		setIsModalEditOpen(true);
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

	const handleOnCloseModal = () => {
		fetchCompanies();
		setIsModalOpen(false);
		setIsModalEditOpen(false);
	};
	return (
		<div className="w-4/5 mx-auto p-5 flex justify-center flex-col">
			<button
				className="m-5 bg-coolPink p-1 rounded-xl w-48 text-white"
				onClick={() => setIsModalOpen(true)}
			>
				Cadastrar Empresa
			</button>
			<ModalComponent onClose={handleOnCloseModal} isOpen={isModalOpen} />
			<ModalEditComponent
				isOpen={isModalEditOpen}
				onClose={handleOnCloseModal}
				company={companyToEdit}
			/>
			<TableComponent
				onEditClick={handleEditClick}
				onDeleteClick={handleDeleteClick}
				isLoading={isLoading}
				companies={companies}
			/>
		</div>
	);
}
