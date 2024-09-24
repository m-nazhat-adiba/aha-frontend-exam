import { User } from './UsersQuery';

export interface SearchQueryParams {
  page: number;
  pageSize: number | string;
  keyword: string;
}

export interface SearchResponse {
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
  data: User[];
}
