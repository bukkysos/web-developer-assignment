export interface newPostFormValuesProps {
    title: string;
    body: string;
}

export interface PostsProps {
    id: string;
    user_id: string;
    title: string;
    body: string;
    created_at: string;
}

export interface Address {
    city: string,
    id: string,
    state: string,
    street: string,
    userId: string,
    zipcode: string
}

export interface UserProps {
    id: string,
    username: string,
    email: string,
    address: Address,
    phone: string,
};

export interface TableProps {
    isLoading: boolean;
    tableData: UserProps[];
};

export interface NewPostModalProps {
    open: boolean;
    onClose: () => void;
    publishing: boolean;
    onPublish: (values: newPostFormValuesProps) => void;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface NotificationProps {
    message: string;
    description?: string;
    type: string;
    resetNotificationType?: () => void
}