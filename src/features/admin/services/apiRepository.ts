import { authApiFetch } from "@/shared/services/api";
import type { DashboardData, DashboardRepository } from "./repository";

export class ApiDashboardRepository implements DashboardRepository {
  private baseUrl: string;

  constructor(baseUrl = '/api/dashboard') {
    this.baseUrl = baseUrl;
  }

  async getDashboardData(type: string): Promise<DashboardData> {
    try {
      const data = await authApiFetch<DashboardData>({
        path: `${this.baseUrl}/${type}`,
        method: 'GET'
      });
      return data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw new Error('Failed to fetch dashboard data from API');
    }
  }
}