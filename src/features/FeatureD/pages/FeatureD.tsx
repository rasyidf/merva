import { Card, SimpleGrid, Title } from '@mantine/core';

type Props = {};

export const FeatureD = (props: Props) => {
  return (
    <div>
      <Title>This is D Feature</Title>
      <SimpleGrid cols={3}>
        <Card p={20}>1</Card>
        <Card p={20}>2</Card>
        <Card p={20}>3</Card>
      </SimpleGrid>
    </div>
  );
};

export default FeatureD;