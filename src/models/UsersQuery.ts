export interface User {
  id: string;
  name: string;
  username: string;
  avater?: string;
  isFollowing: boolean;
}

export interface FollowerResponse {
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
  data: User[];
}

export interface followingResponse {
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
  data: User[];
}
