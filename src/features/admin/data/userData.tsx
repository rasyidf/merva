import { StatCardProps } from "@/shared/components/groups/stats-card";

export const stats = [
  {
    title: "Total Revenue",
    subtitle: "+20.1% from last month",
    value: "$45,231.89",
    icon: "banknote",
  },
  {
    title: "Subscriptions",
    subtitle: "+180.1% from last month",
    value: "+2350",
    icon: "users"
  },
  {
    title: "Sales",
    subtitle: "+19% from last month",
    value: "+12,234",
    icon: "creditCard"
  },
  {
    title: "Active Now",
    subtitle: "+201 since last hour",
    value: "+573",
    icon: "scale"
  },
] satisfies StatCardProps[];

export const data = [
  { month: 'January', Registered: 1200, Processed: 900, Completed: 200 },
  { month: 'February', Registered: 1900, Processed: 1200, Completed: 400 },
  { month: 'March', Registered: 400, Processed: 1000, Completed: 200 },
  { month: 'April', Registered: 1000, Processed: 200, Completed: 800 },
  { month: 'May', Registered: 800, Processed: 1400, Completed: 1200 },
  { month: 'June', Registered: 750, Processed: 600, Completed: 1000 },
];
export const userData = [
  {
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    name: 'Robert Wolfkisser',
    job: 'Engineer',
    email: 'rob_wolf@gmail.com',
    rate: 22,
  },
  {
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
    name: 'Jill Jailbreaker',
    job: 'Engineer',
    email: 'jj@breaker.com',
    rate: 45,
  },
  {
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Henry Silkeater',
    job: 'Designer',
    email: 'henry@silkeater.io',
    rate: 76,
  },
  {
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Bill Horsefighter',
    job: 'Designer',
    email: 'bhorsefighter@gmail.com',
    rate: 15,
  },
  {
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    name: 'Jeremy Footviewer',
    job: 'Manager',
    email: 'jeremy@foot.dev',
    rate: 98,
  },
];
