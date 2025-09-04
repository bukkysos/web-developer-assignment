import React from 'react'

export const PageLoader: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="flex space-x-2">
                <span className="block w-2 h-2 rounded-full bg-purple-300 animate-bounce [animation-delay:0ms]" />
                <span className="block w-2 h-2 rounded-full bg-purple-300 animate-bounce [animation-delay:150ms]" />
                <span className="block w-2 h-2 rounded-full bg-purple-300 animate-bounce [animation-delay:300ms]" />
            </div>
        </div>
    )
};

export const TableLoader: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-[10vh] mb-4">
            <div className="flex space-x-2">
                <span className="block w-2 h-2 rounded-full bg-purple-300 animate-bounce [animation-delay:0ms]" />
                <span className="block w-2 h-2 rounded-full bg-purple-300 animate-bounce [animation-delay:150ms]" />
                <span className="block w-2 h-2 rounded-full bg-purple-300 animate-bounce [animation-delay:300ms]" />
            </div>
        </div>
    )
};