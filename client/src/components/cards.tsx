import React from 'react'
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import type { PostsProps } from '../util/types';

export const PostsCard: React.FC<{ post: PostsProps, onClick: (id: string) => void }> = ({ post, onClick }) => {
    return (
        <div className="relative rounded-xl border border-gray-200
                bg-white shadow p-6 min-h-[240px] flex flex-col"
        >
            {/* Delete Icon */}
            <button
                className="absolute top-3 right-3 text-red-400 transition cursor-pointer"
                    title="Delete"
                    onClick={() => onClick(post?.id || '')}
            >
                <FiTrash2 size={18} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{post?.title}</h2>
            <p className="text-gray-500 text-base leading-snug line-clamp-5">
                {post?.body}
            </p>
        </div>
    )
};

export const NewPostsCard: React.FC<{ setShowModal: (value: boolean) => void }> = ({ setShowModal }) => {
    return (
        <>
            <div className="rounded-xl cursor-pointer border border-dashed border-gray-300 bg-white 
                    p-6 flex flex-col items-center justify-center min-h-[240px] hover:bg-gray-50
                    transition" onClick={() => setShowModal(true)}>
                <button className="flex flex-col cursor-pointer items-center text-gray-400
                        hover:text-violet-600 focus:outline-none">
                    <FiPlus className="text-3xl mb-2" />
                    <span className="text-lg font-medium">New Post</span>
                </button>
            </div>
        </>
    )
};
