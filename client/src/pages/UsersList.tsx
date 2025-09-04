import React, { useState } from 'react'
import { handleFetchUsers } from '../util/request';
import { useQuery } from '@tanstack/react-query';
import { Pagination } from '../components/pagination';
import { Table } from '../components/table';
import { Notification } from '../components/notification';

export const UsersList: React.FC = () => {
    const [pageNo, setPageNo] = useState<number>(1);

    const { data: usersData, isLoading, isError, error, status, isSuccess } = useQuery({
        queryKey: ['users', pageNo],
        queryFn: () => handleFetchUsers(`http://localhost:3001/users?pageNumber=${pageNo - 1}&pageSize=4`),
        enabled: !!pageNo,
        placeholderData: (prevData) => prevData,
        refetchOnWindowFocus: false
    });

    console.log({usersData})

    return (
        <div className="min-h-screen w-screen bg-white content-center px-2 sm:px-4 md:px-8 py-6 md:py-8">
            <Notification
                type={status}
                message={
                    isSuccess
                        ? "User data loaded successfully"
                        : "Failed to load users."
                }
                description={isError ? error?.message : usersData?.message}
            />

            <div className="bg-white rounded-t-xl shadow border border-gray-200 overflow-x-auto">
                <Table isLoading={isLoading} tableData={usersData?.data} />
            </div>
            {usersData?.data &&
                <Pagination
                    currentPage={pageNo}
                    totalPages={usersData?.data?.pagination?.totalPages}
                    onPageChange={setPageNo}
                />
            }
        </div>
    )
}