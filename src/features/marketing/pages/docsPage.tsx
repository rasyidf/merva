import { ScrollArea } from "@mantine/core";
import { Header } from "../modules";

export const Component: React.FC = () => {
  return (
    <>
      <ScrollArea h="100vh"  >
        <Header />
      </ScrollArea>
    </>
  );
};