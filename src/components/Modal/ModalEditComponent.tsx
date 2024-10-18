import { AxiosConfigure } from '@/configurations/axiosConfiguration';
import { CompanyResponseType } from '@/types/company.types';
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	company: CompanyResponseType | undefined;
};

export default function ModalEditComponent({
	isOpen,
	onClose,
	company
}: ModalProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [companyToEdit, setCompanyToEdit] = useState<
		CompanyResponseType | undefined
	>(undefined);

	useEffect(() => {
		setCompanyToEdit(company);
	}, [company]);

	if (!companyToEdit) return;
	const handleDocumentoChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setCompanyToEdit({ ...companyToEdit, documento: value });
	};
	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setCompanyToEdit({ ...companyToEdit, name: value });
	};
	const handleSubmit = () => {
		setIsLoading(true);
		const { public_instance } = new AxiosConfigure();
		public_instance
			.put('companies', companyToEdit)
			.catch((e) => console.error(e))
			.finally(() => setIsLoading(false));
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent className="bg-coolPink">
				<ModalHeader>Update Company</ModalHeader>
				<ModalCloseButton />
				<ModalBody display={'flex'} flexDir={'column'} margin={3} gap={2}>
					<label>Documento</label>
					<Input
						value={companyToEdit.documento}
						className="px-2 text-black font-sans"
						onChange={handleDocumentoChange}
					/>
					<label>Nome</label>
					<Input
						className="px-2 text-black font-sans"
						value={companyToEdit.name}
						onChange={handleNameChange}
					/>
				</ModalBody>

				<ModalFooter>
					{isLoading ? (
						<AiOutlineLoading3Quarters className="animate-spin mr-3" />
					) : (
						<Button
							className="bg-colorFullRed"
							colorScheme=""
							mr={3}
							onClick={handleSubmit}
						>
							Update
						</Button>
					)}
					<Button onClick={onClose}>Exit</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
