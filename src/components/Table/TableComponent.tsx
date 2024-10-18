import { CompanyResponseType } from '@/types/company.types';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import RowComponent from './RowComponent';

type TableProps = {
	companies?: CompanyResponseType[];
	onDeleteClick: (id: number) => void;
	isLoading: boolean;
};
export default function TableComponent({
	isLoading,
	onDeleteClick,
	companies
}: TableProps) {
	if (!companies || isLoading) {
		return <AiOutlineLoading3Quarters className="animate-spin" />;
	}
	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-white uppercase bg-colorFullRed">
					<tr>
						<th scope="col" className="px-6 py-3">
							Company Name
						</th>
						<th scope="col" className="px-6 py-3">
							Document
						</th>
						<th scope="col" className="px-6 py-3">
							IsActive
						</th>
						<th scope="col" className="px-6 py-3">
							Belongs to UserId
						</th>
						<th scope="col" className="px-6 py-3">
							<span className="sr-only">Edit</span>
						</th>
						<th scope="col" className="px-6 py-3">
							<span className="sr-only">Delete</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{companies.map((x) => (
						<RowComponent
							key={x.code}
							onDeleteClick={onDeleteClick}
							isLoading={isLoading}
							company={x}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}
