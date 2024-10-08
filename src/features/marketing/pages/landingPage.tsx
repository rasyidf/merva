import { Button, Container, Divider, Group, Paper, ScrollArea, Text, Title } from "@mantine/core";
import { NavLink } from "react-router-dom";
import { Header } from "../modules/header";

export const Component = () => {
  return (
    <>
      <Header />
      <ScrollArea h="calc(100vh - 64px)">
        <Container size="xl">
          <Paper component="section" p="lg" h="calc(100dvh - 92px)">
            <Title mt={64}>MERVA</Title>
            <Text size="lg">
              Merva adalah codebase yang digunakan untuk membangun aplikasi web dengan konsep modular.
            </Text>

            <Button component={NavLink} to="/app/dashboard" variant="light" size="lg" mt={24}>
              Buka Dashboard
            </Button>
          </Paper>
          <Paper mt={24} component="section" id="testimoni" />
          <Paper h={300} mt={64} component="section" id="footer" />
        </Container>

        <Divider />
        <Container size="xl" p={8}>
          <Group justify="space-between">
            <Text size="sm">Made with ❤️ {new Date().getFullYear()} rasyidf.</Text>
          </Group>
        </Container>
      </ScrollArea>
    </>
  );
};

Component.displayName = "FeatureNamePage";
