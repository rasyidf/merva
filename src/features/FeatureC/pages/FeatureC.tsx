import { Card, SimpleGrid } from '@mantine/core';

type Props = {};

export const FeatureC = (props: Props) => {
  return (
    <div>
      <SimpleGrid cols={3}>
        <Card p={20}>1</Card>
        <Card p={20}>2</Card>
        <Card p={20}>3</Card>
      </SimpleGrid>
    </div>
  );
};

export default FeatureC;