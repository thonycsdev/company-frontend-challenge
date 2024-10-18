'use client';
import { axios_configuration } from '@/configurations/axiosConfiguration';
import { useAuth } from '@/context/authContext';
import { CompanyResponseType } from '@/types/company.types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Companies() {
  const { getUser } = useAuth();
  const router = useRouter();
  const [companies, setCompanies] = useState<CompanyResponseType[]>([]);
  useEffect(() => {
    //Checks user authentication
    const user = getUser();
    if (!user) {
      router.back();
    } else {
      axios
        .get(process.env.NEXT_PUBLIC_URL + 'companies', {
          headers: {
            Authorization: `Bearer ${user?.jwtToken}`
          }
        })
        .then((c) => setCompanies(c.data));
    }

    //Get Companies on mount
  }, []);

  if (companies.length === 0) {
    return <h1>Loading...</h1>;
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
            <tr
              key={x.code}
              className="bg-coolPink border-b text-white  hover:bg-[#D9725B]"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-white whitespace-nowrap"
              >
                {x.name}
              </th>
              <td className="px-6 py-4">{x.documento}</td>
              <td className="px-6 py-4">
                <input type="checkbox" readOnly checked={x.ativo} />
              </td>
              <td className="px-6 py-4">{x.userId}</td>
              <td className="px-3">
                <img src="./edit.svg" />
              </td>
              <td className="px-3">
                <img src="./delete.svg" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
