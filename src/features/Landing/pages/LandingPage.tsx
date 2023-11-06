import AppLogo from "@/components/elements/AppLogo";
import {
  BackgroundImage,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Group,
  Image,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { Header } from "../modules/header";


export const Component = () => {
  
  return (
    <>
      <Header />
      <ScrollArea h="calc(100vh - 64px)">
        <Container size="xl">
          <Paper component="section" p="lg">


          </Paper>
          <Paper mt={24} component="section" id="testimoni">

          </Paper>
          <Paper bg="green.8" h={200} radius="lg" mt={24} p="lg" component="section" id="cta">

          </Paper>
          <Paper h={300} mt={64} component="section" id="footer">

          </Paper>
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
