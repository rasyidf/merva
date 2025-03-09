export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  status: UserStatus;
  roles: Role[];
  createdAt: string;
  lastActive?: string;
  phoneNumber?: string;
  department?: string;
  position?: string;
  bio?: string;
  metadata?: Record<string, any>;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  isSystem?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
  isSystem?: boolean;
}

export interface UserFilters {
  status?: UserStatus;
  role?: string;
  search?: string;
  department?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface RoleFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface UserFormValues {
  username: string;
  email: string;
  fullName: string;
  roles: string[];
  status: UserStatus;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
  department?: string;
  position?: string;
  bio?: string;
}

export interface RoleFormValues {
  name: string;
  description?: string;
  permissions: string[];
}