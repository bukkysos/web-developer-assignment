import React from 'react'
import { useNavigate } from 'react-router';
import type { TableProps, UserProps } from '../util/types';
import { TableLoader } from '../util/loader';

export const Table: React.FC<TableProps> = ({ isLoading, tableData }) => {
    const navigate = useNavigate();

    const navigateTo = (
        url: string,
        id: string,
        email: string,
        name: string
    ) => {
        navigate(url, { state: { id, email, name } });
    }

    return (
        <>
            <table className="min-w-full truncate">
                <thead>
                    <tr className="bg-white">
                        <th
                            className="text-left px-3 sm:px-4 md:px-8 py-3
                            sm:py-4 md:py-6 text-gray-500 font-medium text-sm
                            xl:text-lg whitespace-nowrap truncate">
                            Full Name
                        </th>

                        <th
                            className="text-left px-3 sm:px-4 md:px-8 py-3
                            sm:py-4 md:py-6 text-gray-500 font-medium text-sm
                            xl:text-lg whitespace-nowrap truncate">
                            Email Address
                        </th>

                        <th
                            className="text-left px-3 sm:px-4 md:px-8 py-3
                            sm:py-4 md:py-6 text-gray-500 font-medium text-sm
                            xl:text-lg whitespace-nowrap truncate">
                            Address
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ?
                        <tr>
                            <td colSpan={3} className="text-gray-500 place-items-center ">
                                <TableLoader />
                            </td>
                        </tr>
                        :
                        Boolean(tableData?.length) ?
                            tableData?.map((user: UserProps) =>
                                <React.Fragment key={user.id}>
                                    <tr className="border-t border-gray-200 cursor-pointer"
                                        onClick={() => { navigateTo('/user-post', user.id, user.email, user.username) }}>
                                        <td className="px-3 sm:px-4 md:px-8 py-3 sm:py-4 md:py-6 text-sm
                                xl:text-lg font-semibold text-gray-800 max-w-[10rem] sm:max-w-xs
                                md:max-w-sm overflow-hidden whitespace-nowrap truncate">
                                            {user?.username ?? 'No data available'}
                                        </td>

                                        <td className="px-3 sm:px-4 md:px-8 py-3 sm:py-4 md:py-6 text-sm
                                xl:text-lg text-gray-500 max-w-[12rem] sm:max-w-xs md:max-w-md
                                overflow-hidden whitespace-nowrap truncate">
                                            {user?.email ?? 'No data available'}
                                        </td>

                                        <td className="max-w-[392px] px-3 sm:px-4 md:px-8 py-3 sm:py-4
                                md:py-6 text-sm xl:text-lg text-gray-500 overflow-hidden
                                whitespace-nowrap truncate">
                                            {user.address.street ?? 'No data available'}
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-gray-500 place-items-center pb-6">
                                        No Users Found
                                    </td>
                                </tr>
                            )
                    }
                </tbody>
            </table>
        </>
    )
}
