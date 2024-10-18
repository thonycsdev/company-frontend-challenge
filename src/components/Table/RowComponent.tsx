import { CompanyResponseType } from '@/types/company.types';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type RowProps = {
	isLoading: boolean;
	company?: CompanyResponseType;
	onDeleteClick: (id: number) => void;
	onEditClick: (company: CompanyResponseType) => void;
};
export default function RowComponent({
	company,
	isLoading,
	onDeleteClick,
	onEditClick
}: RowProps) {
	if (!company) return;

	return (
		<tr
			key={company.code}
			className="bg-coolPink border-b text-white  hover:bg-[#D9725B]"
		>
			<th
				scope="row"
				className="px-6 py-4 font-medium text-white whitespace-nowrap"
			>
				{company.name}
			</th>
			<td className="px-6 py-4">{company.documento}</td>
			<td className="px-6 py-4">
				<input type="checkbox" readOnly checked={company.ativo} />
			</td>
			<td className="px-6 py-4">{company.userId}</td>
			<td onClick={() => onEditClick(company)} className="px-3">
				<img src="./edit.svg" />
			</td>
			<td
				key={company.code}
				className="px-3"
				onClick={() => onDeleteClick(company.id)}
			>
				{isLoading ? (
					<AiOutlineLoading3Quarters className="animate-spin" />
				) : (
					<img src="./delete.svg" />
				)}
			</td>
		</tr>
	);
}
