import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { type DashboardRepository, DashboardData, MockDashboardRepository } from './repository';
import { ApiDashboardRepository } from './apiRepository';
import { z } from 'zod';

export class DashboardService {
  private repository: DashboardRepository;
  private static instance: DashboardService;

  private constructor(repository?: DashboardRepository) {
    this.repository = repository ?? new MockDashboardRepository();
  }

  public static getInstance(repository?: DashboardRepository): DashboardService {
    if (!DashboardService.instance) {
      DashboardService.instance = new DashboardService(repository);
    }
    return DashboardService.instance;
  }

  public setRepository(repository: DashboardRepository) {
    this.repository = repository;
  }

  async getDashboardData(type?: string): Promise<DashboardData> {
    try {
      return await this.repository.getDashboardData(type || 'default');
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw new Error('Failed to fetch dashboard data');
    }
  }
}

// Custom hook for using dashboard data with React Query
export function useDashboardData(type: string = 'default') {
  return useQuery({
    queryKey: ['dashboard', type],
    queryFn: () => DashboardService.getInstance().getDashboardData(type),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
}

// Initialize singleton instance with mock repository by default
// Can be switched to API repository when backend is ready
export const dashboardService = DashboardService.getInstance();