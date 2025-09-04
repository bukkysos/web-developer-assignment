import React, { useState } from 'react';
import { Link } from "react-router";
import { FiArrowLeft } from 'react-icons/fi';
import { useLocation } from 'react-router';
import { NewPostModal } from '../components/newPostModal';
import { useQuery } from '@tanstack/react-query';
import { handleDeleteUserPostsById, handleFetchAllPostsByUser, handleUserPostAction } from '../util/request';
import type { newPostFormValuesProps, PostsProps } from '../util/types';
import { PageLoader } from '../util/loader';
import { NewPostsCard, PostsCard } from '../components/cards';
import { Notification } from '../components/notification';

export const UserPost: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [publishing, setPublishing] = useState<boolean>(false);
    const location = useLocation();
    const myData = location.state;
    
    const { data: postsData, isLoading, isError, error, isSuccess, status, refetch } = useQuery({
        queryKey: ['postsByUser', myData?.id],
        queryFn: () => handleFetchAllPostsByUser(`${myData?.id}`),
        enabled: !!myData?.id,
        // placeholderData: (prevData) => prevData,
        refetchOnWindowFocus: false
    });
    const [publishingStatus, setPublishingStatus] =
        useState<{ type: string, message: string }>(
            { type: status || '', message: '' }
        );

    const handlePostNewPost = async (values: newPostFormValuesProps) => {
        if (values?.title.trim() === '' || values?.body.trim() === '') {
            setPublishingStatus({
                type: 'succcess',
                message: "Title and body are required"
            });
            return;
        }
        try {
            setPublishing(true)
            const response = await handleUserPostAction(myData?.id, values);
            if (response?.showing && response?.type === "success") {
                refetch();
                setPublishingStatus({
                    type: response?.type,
                    // error: response?.type === "success",
                    message: response?.message || "Post published successfully"
                });
                setTimeout(() => {
                    setShowModal(false);
                    setPublishing(false)
                }, 2000);
            }
        } catch (error: any) {
            setPublishing(false)
            setPublishingStatus({
                type: 'error',
                message: error?.message || "Error publishing post"
            });
        }
    }
    const handleDeletePost = async (postId: string) => {
        setPublishing(true)
        try {
            const response = await handleDeleteUserPostsById(postId);
            if (response?.showing && response?.type === "success") {
                refetch();
                setPublishingStatus({
                    type: response?.type,
                    message: response?.message || "Post Deleted successfully"
                });
                setTimeout(() => {
                    setShowModal(false);
                    setPublishing(false)
                }, 2000);
            }
        } catch (error: any) {
            setPublishing(false)
            setPublishingStatus({
                type: 'error',
                message: error?.message || "Error publishing post"
            });
        }
    }

    return (
        <div className="w-full min-h-screen bg-white px-2 sm:px-6 py-4 sm:py-8">
            <NewPostModal
                open={showModal}
                onClose={() => setShowModal(false)}
                publishing={publishing}
                onPublish={handlePostNewPost}
            />
            <Notification
                message={
                    isSuccess
                        ? "Operation successful"
                        : "Unsuccessful operation"
                }
                description={
                    isError ? error?.message ?? publishingStatus?.message :
                        postsData?.message ?? publishingStatus.message
                }
                type={publishingStatus.type}
                resetNotificationType={() => setPublishingStatus({ type: '', message: '' })}
            />
            {isLoading ? <PageLoader /> :
                <>
                    <div className="mb-2">
                        <Link to="/" className="flex items-center text-gray-950 cursor-pointer
                hover:text-gray-700 text-sm font-medium mb-2">
                            <FiArrowLeft className="mr-1" /> Back to Users
                        </Link>
                    </div>
                    {/* User Info */}
                    <h2 className="text-sm sm:text-[1.5rem] md:text-[2rem] font-black text-gray-900 
            leading-tight mb-3">
                        {myData?.name}
                    </h2>
                    <div className="text-gray-500 text-base sm:text-lg mb-4 flex flex-wrap items-center
            gap-2">
                        <span>{myData?.email}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>
                            {`${postsData?.data?.data?.length ?? 0} Post${postsData?.data?.data?.length > 1 ? 's' : ''}`}
                        </span>
                    </div>

                    {/* Posts Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            2xl:grid-cols-6 gap-4">
                        {/* New Post Card */}
                        <NewPostsCard setShowModal={setShowModal} />
                        {/* Post Cards */}
                        {postsData?.data?.map((post: PostsProps, index: any) => (
                            <React.Fragment key={post?.id + index}>
                                <PostsCard post={post} onClick={handleDeletePost} />
                            </React.Fragment>
                        ))}
                    </div>
                </>
            }
        </div>
    )
};