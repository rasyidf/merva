import {
  Button,
  Container,
  Stack,
  Text,
  Title
} from '@mantine/core';
import React from 'react';

const Contact: React.FC = () => {
  return (
    <Container size="md" py="xl">
      <Title ta="center" order={2} mb="sm">
        Want to Enhance Your Digital Experience?
      </Title>
      <Text ta="center" c="gray" size="lg" mb="xl">
        Let&apos;s create something amazing together. Reserve your spot now and take
        your ideas to the next level with our expertise.
      </Text>



      <form>
        <Stack gap="md">

          <Button
            type="submit"
            fullWidth
            radius="md"
            size="md"
          >
            Reserve Now
          </Button>
        </Stack>
      </form>

      <Text ta="center" c="gray" size="sm" mt="xl">
        Prefer talking directly? Reach out via email or Twitter for immediate
        assistance.
      </Text>
    </Container>
  );
};

export default Contact;
