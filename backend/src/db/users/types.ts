export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export type Pagination = {
  pageNumber: number;
  pageSize: number;
  totalUsers: number;
};
