export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  email: string;
  name?: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserDto {
  email?: string;
  name?: string;
  password?: string;
  role?: UserRole;
}

export interface UserResponse {
  success: boolean;
  data?: User;
  message?: string;
}

export interface UsersListResponse {
  success: boolean;
  data?: User[];
  message?: string;
}
