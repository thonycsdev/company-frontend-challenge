'use client';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Companies() {
  const { getUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.back();
    }
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-colorFullRed">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
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
          <tr className="bg-coolPink border-b text-white  hover:bg-[#D9725B]">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-white whitespace-nowrap"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-3">
              <img src="./edit.svg" />
            </td>
            <td className="px-3">
              <img src="./delete.svg" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
