import { AxiosConfigure } from '@/configurations/axiosConfiguration';
import { COMPANIES } from '@/constants/endpoints';
import { createCompany } from '@/services/company';
import { CompanyResquestType } from '@/types/company.types';
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
import { ChangeEvent, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

export default function ModalComponent({ isOpen, onClose }: ModalProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [documento, setDocumento] = useState('');
	const [name, setName] = useState('');

	const handleDocumentoChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setDocumento(value);
	};
	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setName(value);
	};
	const handleSubmit = () => {
		const payload: CompanyResquestType = {
			documento,
			name,
			mailList: '[]',
			contatosTecnicos: '[]',
			tecnologias: '[]'
		};
		setIsLoading(true);
		const { public_instance } = new AxiosConfigure();
		public_instance
			.post('companies', payload)
			.catch((e) => console.error(e))
			.finally(() => setIsLoading(false));
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent className="bg-coolPink">
				<ModalHeader>Create Company</ModalHeader>
				<ModalCloseButton />
				<ModalBody display={'flex'} flexDir={'column'} margin={3} gap={2}>
					<label>Documento</label>
					<Input
						value={documento}
						className="px-2 text-black font-sans"
						onChange={handleDocumentoChange}
					/>
					<label>Nome</label>
					<Input
						className="px-2 text-black font-sans"
						value={name}
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
							Create
						</Button>
					)}
					<Button onClick={onClose}>Exit</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
