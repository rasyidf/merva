import { PageHeader } from "@/components/groups/Header";
import { Card, List, Paper, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { LoaderFunctionArgs } from "react-router-dom";


export async function loader({ request }: LoaderFunctionArgs) {

  return null;
}

export const FeatureB = () => {
  const { data = [], error, isLoading } = useQuery({
    queryKey: ['todos', 'all'],
    queryFn: ({ signal }) => { 
      return fetch('https://jsonplaceholder.typicode.com/todos', {  signal }).then((res) => res.json());
    },
  });
  return (
    <Paper p={16}>
      <PageHeader title="List View" subtitle="This is the list view for Entity B." />

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      <Stack>
        {data?.map((todo: any) => (
          <Card key={todo.id} withBorder>{todo.title}</Card>
        ))}
      </Stack>
    </Paper>
  );
};

export default FeatureB;
