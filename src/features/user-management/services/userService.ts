import { authApiFetch } from "@/shared/services/api";
import { PaginatedResult, User, UserFilters, UserFormValues, UserStatus } from "../types";
import { mockUsers } from "../data/mockData";

export class UserService {
  private static instance: UserService;
  private baseUrl: string = '/api/users';
  private mockMode: boolean = true; // Set to false for real API

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async getUsers(filters: UserFilters = {}): Promise<PaginatedResult<User>> {
    if (this.mockMode) {
      return this.getMockUsers(filters);
    }

    try {
      return await authApiFetch<PaginatedResult<User>>({
        path: this.baseUrl,
        method: 'GET',
        filter: filters as Record<string, any>
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getUser(id: string): Promise<User> {
    if (this.mockMode) {
      const user = mockUsers.find(u => u.id === id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    }

    try {
      return await authApiFetch<User>({
        path: `${this.baseUrl}/${id}`,
        method: 'GET'
      });
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  }

  async createUser(userData: UserFormValues): Promise<User> {
    if (this.mockMode) {
      const newUser: User = {
        id: `user-${Date.now()}`,
        username: userData.username,
        email: userData.email,
        fullName: userData.fullName,
        status: userData.status,
        roles: [],
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        phoneNumber: userData.phoneNumber,
        department: userData.department,
        position: userData.position,
        bio: userData.bio
      };

      mockUsers.push(newUser);
      return newUser;
    }

    try {
      return await authApiFetch<User>({
        path: this.baseUrl,
        method: 'POST',
        body: JSON.stringify(userData)
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(id: string, userData: Partial<UserFormValues>): Promise<User> {
    if (this.mockMode) {
      const userIndex = mockUsers.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new Error(`User with ID ${id} not found`);
      }

      const updatedUser = { 
        ...mockUsers[userIndex],
        ...userData,
      };

      mockUsers[userIndex] = updatedUser as User;
      return updatedUser as User;
    }

    try {
      return await authApiFetch<User>({
        path: `${this.baseUrl}/${id}`,
        method: 'PUT',
        body: JSON.stringify(userData)
      });
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    if (this.mockMode) {
      const userIndex = mockUsers.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new Error(`User with ID ${id} not found`);
      }
      mockUsers.splice(userIndex, 1);
      return;
    }

    try {
      await authApiFetch({
        path: `${this.baseUrl}/${id}`,
        method: 'DELETE'
      });
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  }

  private getMockUsers(filters: UserFilters): PaginatedResult<User> {
    let filteredUsers = [...mockUsers];
    
    // Apply filters
    if (filters.status) {
      filteredUsers = filteredUsers.filter(user => user.status === filters.status);
    }
    
    if (filters.role) {
      filteredUsers = filteredUsers.filter(user => 
        user.roles.some(role => role.id === filters.role || role.name === filters.role)
      );
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.username.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.fullName.toLowerCase().includes(searchLower)
      );
    }

    if (filters.department) {
      filteredUsers = filteredUsers.filter(user => 
        user.department && user.department.toLowerCase() === filters.department?.toLowerCase()
      );
    }

    // Sorting
    if (filters.sortBy) {
      filteredUsers.sort((a: any, b: any) => {
        const aValue = a[filters.sortBy!];
        const bValue = b[filters.sortBy!];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return filters.sortOrder === 'desc' 
            ? bValue.localeCompare(aValue) 
            : aValue.localeCompare(bValue);
        }
        
        return filters.sortOrder === 'desc' 
          ? (bValue || 0) - (aValue || 0) 
          : (aValue || 0) - (bValue || 0);
      });
    }

    // Pagination
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 10;
    const startIndex = (page - 1) * pageSize;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

    return {
      data: paginatedUsers,
      total: filteredUsers.length,
      page,
      pageSize,
      totalPages: Math.ceil(filteredUsers.length / pageSize),
    };
  }
}

// Export a singleton instance
export const userService = UserService.getInstance();