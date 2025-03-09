import { z } from "zod";

export interface DashboardData {
  stats: Array<{
    title: string;
    subtitle: string;
    value: string;
    icon: string;
  }>;
  chartData: Array<Record<string, number | string>>;
  tableData: Array<Record<string, any>>;
}

export interface DashboardRepository {
  getDashboardData(type: string): Promise<DashboardData>;
}

// Mock implementation for different dashboard types
export class MockDashboardRepository implements DashboardRepository {
  async getDashboardData(type: string): Promise<DashboardData> {
    switch (type) {
      case 'property':
        return {
          stats: [
            { title: "Total Properties", subtitle: "+5.1% from last month", value: "1,234", icon: "building" },
            { title: "Occupied Units", subtitle: "+12% from last month", value: "987", icon: "users" },
            { title: "Maintenance Requests", subtitle: "+8 new today", value: "45", icon: "tools" },
            { title: "Revenue", subtitle: "+2.3% from last month", value: "$234,567", icon: "banknote" }
          ],
          chartData: [
            { month: 'Jan', Occupied: 800, Vacant: 200, Maintenance: 30 },
            { month: 'Feb', Occupied: 850, Vacant: 150, Maintenance: 25 },
            { month: 'Mar', Occupied: 900, Vacant: 100, Maintenance: 35 },
            { month: 'Apr', Occupied: 875, Vacant: 125, Maintenance: 40 },
            { month: 'May', Occupied: 925, Vacant: 75, Maintenance: 20 },
            { month: 'Jun', Occupied: 950, Vacant: 50, Maintenance: 15 }
          ],
          tableData: [
            { property: "Sunset Apartments", units: 100, occupied: 95, revenue: "$150,000", status: "Active" },
            { property: "Downtown Complex", units: 75, occupied: 70, revenue: "$120,000", status: "Active" },
            { property: "Garden Villas", units: 50, occupied: 45, revenue: "$80,000", status: "Maintenance" }
          ]
        };

      case 'teaching':
        return {
          stats: [
            { title: "Active Students", subtitle: "+15 this week", value: "156", icon: "users" },
            { title: "Assignments", subtitle: "12 need grading", value: "45", icon: "book" },
            { title: "Class Average", subtitle: "+2.1% improvement", value: "87%", icon: "chart" },
            { title: "Office Hours", subtitle: "Next: 2:00 PM", value: "3hrs", icon: "clock" }
          ],
          chartData: [
            { week: 'Week 1', Submissions: 45, Completed: 40, Late: 5 },
            { week: 'Week 2', Submissions: 48, Completed: 45, Late: 3 },
            { week: 'Week 3', Submissions: 50, Completed: 48, Late: 2 },
            { week: 'Week 4', Submissions: 47, Completed: 45, Late: 2 }
          ],
          tableData: [
            { student: "Alice Johnson", attendance: "95%", grade: "A", lastSubmission: "2 days ago", status: "Active" },
            { student: "Bob Smith", attendance: "88%", grade: "B+", lastSubmission: "1 day ago", status: "Active" },
            { student: "Carol White", attendance: "92%", grade: "A-", lastSubmission: "Today", status: "Active" }
          ]
        };

      case 'vet':
        return {
          stats: [
            { title: "Patients Today", subtitle: "+3 new appointments", value: "24", icon: "paw" },
            { title: "Surgeries", subtitle: "2 scheduled", value: "5", icon: "stethoscope" },
            { title: "Inventory", subtitle: "3 items low", value: "85%", icon: "box" },
            { title: "Revenue", subtitle: "+5.2% this week", value: "$12,450", icon: "banknote" }
          ],
          chartData: [
            { day: 'Mon', Checkups: 12, Surgeries: 2, Emergency: 1 },
            { day: 'Tue', Checkups: 15, Surgeries: 1, Emergency: 2 },
            { day: 'Wed', Checkups: 10, Surgeries: 3, Emergency: 1 },
            { day: 'Thu', Checkups: 14, Surgeries: 2, Emergency: 3 }
          ],
          tableData: [
            { pet: "Max", owner: "John Doe", type: "Dog", appointment: "09:00 AM", status: "Scheduled" },
            { pet: "Luna", owner: "Jane Smith", type: "Cat", appointment: "10:30 AM", status: "In Treatment" },
            { pet: "Rocky", owner: "Mike Johnson", type: "Dog", appointment: "02:00 PM", status: "Completed" }
          ]
        };

      default:
        return {
          stats: [
            { title: "Total Revenue", subtitle: "+20.1% from last month", value: "$45,231.89", icon: "banknote" },
            { title: "Subscriptions", subtitle: "+180.1% from last month", value: "+2350", icon: "users" },
            { title: "Sales", subtitle: "+19% from last month", value: "+12,234", icon: "creditCard" },
            { title: "Active Now", subtitle: "+201 since last hour", value: "+573", icon: "scale" }
          ],
          chartData: [
            { month: 'January', Registered: 1200, Processed: 900, Completed: 200 },
            { month: 'February', Registered: 1900, Processed: 1200, Completed: 400 },
            { month: 'March', Registered: 400, Processed: 1000, Completed: 200 },
            { month: 'April', Registered: 1000, Processed: 200, Completed: 800 },
            { month: 'May', Registered: 800, Processed: 1400, Completed: 1200 },
            { month: 'June', Registered: 750, Processed: 600, Completed: 1000 }
          ],
          tableData: [
            { name: 'Robert Wolfkisser', job: 'Engineer', email: 'rob_wolf@gmail.com', rate: 22 },
            { name: 'Jill Jailbreaker', job: 'Engineer', email: 'jj@breaker.com', rate: 45 },
            { name: 'Henry Silkeater', job: 'Designer', email: 'henry@silkeater.io', rate: 76 }
          ]
        };
    }
  }
}