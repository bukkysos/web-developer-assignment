import React, { useEffect, useState } from "react";
import type { NotificationProps } from "../util/types";

export const Notification: React.FC<NotificationProps> = ({
    message,
    description,
    type,
    resetNotificationType = () => {}
}) => {
    const [showNotification, setShowNotification] = useState<string>(type);
    useEffect(() => {
        setShowNotification(type);
        setTimeout(() => {
            setShowNotification("");
            resetNotificationType && resetNotificationType();
        }, 2500);
    }, [type]);

    return (
        <div
            className={`
        fixed top-4 right-4 z-50
        transition-transform duration-500 ease-in-out
        ${showNotification === 'success' || showNotification === 'error' ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}
        >
            <div className="flex items-start bg-white rounded-xl shadow-xl border border-gray-200 px-6 py-4 min-w-[340px] max-w-xs sm:max-w-md">
                <div className="flex-shrink-0 mt-1 mr-3">
                    {type === "success" ?
                        <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </span> : type === "error" ?
                            <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </span> : <></>
                    }
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-gray-800 mb-1">{message}</div>
                    {description && (
                        <div className="text-gray-500 text-sm">{description}</div>
                    )}
                </div>
                <button
                    className="ml-4 text-gray-400 hover:text-gray-600 transition"
                    onClick={() => setShowNotification("")}
                    aria-label="Close"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};