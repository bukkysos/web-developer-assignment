import React from "react";
import type { newPostFormValuesProps, NewPostModalProps } from "../util/types";

interface SubmitFormEvent extends React.FormEvent<HTMLFormElement> { }

export const NewPostModal: React.FC<NewPostModalProps> = ({
    open,
    onClose,
    publishing,
    onPublish,
}) => {
    if (!open) return null;
    const submitForm = (e: SubmitFormEvent) => {
        e.preventDefault();
        if (e?.currentTarget["post-title"]?.value &&
            e?.currentTarget["post-content"]?.value) {
            const newPostFormValues: newPostFormValuesProps = {
                title: e?.currentTarget["post-title"]?.value,
                body: e?.currentTarget["post-content"]?.value
            }
            onPublish(newPostFormValues);
        }
        return;
    };
    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20">
            <div className="bg-gray-50 rounded-2xl shadow-2xl max-w-3xl w-full mx-2 p-8 relative">
                <h2 className="text-3xl font-black text-gray-900 mb-8">New Post</h2>
                <form onSubmit={submitForm}>
                    <div className="mb-6">
                        <label
                            className="block text-lg font-semibold text-gray-500 mb-2" htmlFor="post-title">
                            Post title
                        </label>
                        <input
                            id="post-title"
                            type="text"
                            name="post-title"
                            placeholder="Give your post a title"
                            autoComplete="off"
                            autoFocus
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-md
                            text-gray-700 bg-white placeholder-gray-400 focus:outline-none
                            focus:ring-2 focus:ring-violet-200"
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-lg font-semibold text-gray-500 mb-2" htmlFor="post-content">
                            Post content
                        </label>
                        <textarea
                            id="post-content"
                            name="content"
                            rows={5}
                            placeholder="Write something mind-blowing"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-md
                            text-gray-700 bg-white placeholder-gray-400 focus:outline-none
                            focus:ring-2 focus:ring-violet-200 resize-none"
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            className="px-6 py-2 rounded-lg border border-gray-200 bg-white
                            text-gray-500 font-medium hover:bg-gray-100 disabled:opacity-50
                            disabled:cursor-not-allowed cursor-pointer"
                            onClick={onClose}
                            disabled={publishing}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={publishing}
                            className="px-6 py-2 rounded-lg bg-gray-800 text-white font-medium
                            hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed
                            cursor-pointer">
                                {publishing? 'Publishing...' : 'Publish'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};