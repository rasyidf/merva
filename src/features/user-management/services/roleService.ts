import { authApiFetch } from "@/shared/services/api";
import { PaginatedResult, Role, RoleFilters, RoleFormValues, Permission } from "../types";
import { mockRoles, mockPermissions } from "../data/mockData";

export class RoleService {
  private static instance: RoleService;
  private baseUrl: string = '/api/roles';
  private mockMode: boolean = true;

  private constructor() {}

  public static getInstance(): RoleService {
    if (!RoleService.instance) {
      RoleService.instance = new RoleService();
    }
    return RoleService.instance;
  }

  async getRoles(filters: RoleFilters = {}): Promise<PaginatedResult<Role>> {
    if (this.mockMode) {
      return this.getMockRoles(filters);
    }

    try {
      return await authApiFetch<PaginatedResult<Role>>({
        path: this.baseUrl,
        method: 'GET',
        filter: filters
      });
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  }

  async getRole(id: string): Promise<Role> {
    if (this.mockMode) {
      const role = mockRoles.find(r => r.id === id);
      if (!role) {
        throw new Error(`Role with ID ${id} not found`);
      }
      return { ...role }; // Return a copy to prevent mutations
    }

    try {
      return await authApiFetch<Role>({
        path: `${this.baseUrl}/${id}`,
        method: 'GET'
      });
    } catch (error) {
      console.error(`Error fetching role ${id}:`, error);
      throw error;
    }
  }

  async createRole(roleData: RoleFormValues): Promise<Role> {
    if (this.mockMode) {
      const assignedPermissions = mockPermissions.filter(
        p => roleData.permissions.includes(p.id)
      );

      const newRole: Role = {
        id: `role-${Date.now()}`,
        name: roleData.name,
        description: roleData.description,
        permissions: assignedPermissions,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isSystem: false
      };

      mockRoles.push({ ...newRole }); // Add a copy
      return newRole;
    }

    try {
      return await authApiFetch<Role>({
        path: this.baseUrl,
        method: 'POST',
        body: JSON.stringify(roleData)
      });
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  }

  async updateRole(id: string, roleData: Partial<RoleFormValues>): Promise<Role> {
    if (this.mockMode) {
      const roleIndex = mockRoles.findIndex(r => r.id === id);
      if (roleIndex === -1) {
        throw new Error(`Role with ID ${id} not found`);
      }

      const existingRole = mockRoles[roleIndex];
      if (!existingRole) {
        throw new Error(`Role with ID ${id} not found`);
      }

      // Don't allow updating system roles
      if (existingRole.isSystem) {
        throw new Error("System roles cannot be modified");
      }

      // Create updated role with new data while preserving existing fields
      const updatedRole: Role = {
        ...existingRole,
        id: existingRole.id,
        name: roleData.name ?? existingRole.name,
        description: roleData.description ?? existingRole.description,
        permissions: roleData.permissions 
          ? mockPermissions.filter(p => roleData.permissions!.includes(p.id))
          : existingRole.permissions,
        createdAt: existingRole.createdAt,
        updatedAt: new Date().toISOString(),
        isSystem: existingRole.isSystem
      };

      mockRoles[roleIndex] = { ...updatedRole }; // Replace with a copy
      return { ...updatedRole }; // Return a copy
    }

    try {
      return await authApiFetch<Role>({
        path: `${this.baseUrl}/${id}`,
        method: 'PUT',
        body: JSON.stringify(roleData)
      });
    } catch (error) {
      console.error(`Error updating role ${id}:`, error);
      throw error;
    }
  }

  async deleteRole(id: string): Promise<void> {
    if (this.mockMode) {
      const roleIndex = mockRoles.findIndex(r => r.id === id);
      if (roleIndex === -1) {
        throw new Error(`Role with ID ${id} not found`);
      }

      const role = mockRoles[roleIndex];
      if (!role) {
        throw new Error(`Role with ID ${id} not found`);
      }

      // Don't allow deleting system roles
      if (role.isSystem) {
        throw new Error("System roles cannot be deleted");
      }
      
      mockRoles.splice(roleIndex, 1);
      return;
    }

    try {
      await authApiFetch({
        path: `${this.baseUrl}/${id}`,
        method: 'DELETE'
      });
    } catch (error) {
      console.error(`Error deleting role ${id}:`, error);
      throw error;
    }
  }

  async getAllPermissions(): Promise<Permission[]> {
    if (this.mockMode) {
      return [...mockPermissions]; // Return a copy
    }

    try {
      return await authApiFetch<Permission[]>({
        path: '/api/permissions',
        method: 'GET'
      });
    } catch (error) {
      console.error('Error fetching permissions:', error);
      throw error;
    }
  }

  private getMockRoles(filters: RoleFilters): PaginatedResult<Role> {
    let filteredRoles = [...mockRoles]; // Work with a copy
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredRoles = filteredRoles.filter(role =>
        role.name.toLowerCase().includes(searchLower) ||
        (role.description && role.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredRoles.sort((a: any, b: any) => {
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

    // Apply pagination
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 10;
    const startIndex = (page - 1) * pageSize;
    const paginatedRoles = filteredRoles.slice(startIndex, startIndex + pageSize);

    return {
      data: paginatedRoles.map(role => ({ ...role })), // Return copies
      total: filteredRoles.length,
      page,
      pageSize,
      totalPages: Math.ceil(filteredRoles.length / pageSize),
    };
  }
}

// Export a singleton instance
export const roleService = RoleService.getInstance();