import React from 'react';
import type { PaginationProps } from '../util/types';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Helper to generate page numbers (with ellipsis)
  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-6 md:mt-8">
      <div className="flex-1 flex items-center justify-end">
        <nav className="inline-flex items-center space-x-1 sm:space-x-2" aria-label="Pagination">
          <button
            className={`flex items-center px-2 sm:px-4 py-2 text-sm sm:text-base rounded-lg ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-violet-700 font-semibold hover:bg-violet-50'
            }`}
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <span className="mr-1 sm:mr-2">&larr;</span>
            <span className="hidden sm:inline">Previous</span>
          </button>
          {getPages().map((page, idx) =>
            typeof page === 'number' ? (
              <button
                key={page}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-semibold text-sm sm:text-base ${
                  currentPage === page
                    ? 'bg-violet-100 text-violet-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => onPageChange(page)}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ) : (
              <span key={`ellipsis-${idx}`} className="px-1 sm:px-2 text-gray-400 select-none">
                ...
              </span>
            )
          )}
          <button
            className={`flex items-center px-2 sm:px-4 py-2 text-sm sm:text-base rounded-lg ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-violet-700 font-semibold hover:bg-violet-50'
            }`}
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <span className="hidden sm:inline">Next</span>
            <span className="ml-1 sm:ml-2">&rarr;</span>
          </button>
        </nav>
      </div>
    </div>
  );
};