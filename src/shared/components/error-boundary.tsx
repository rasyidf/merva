import { AppLogo } from "@/shared/components/ui/icon";
import { isDev } from "@/shared/utils/constants";
import { Accordion, Code, Container, Flex, Text, Title } from "@mantine/core";
import React, { useEffect } from "react";
import { useRouteError } from "react-router-dom";

export const ErrorBoundary = () => {
  const error = useRouteError();

  useEffect(() => {
    if (error) {
      console.error("ErrorBoundary", error);
    }
  }, [error]);
  return (
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      <Container size="lg" h={400}>
        <AppLogo />
        <Title order={1}>Duh! ada sesuatu yang tidak beres</Title>
        <Text size="lg" mt={4} mb={8}>
          Terjadi kesalahan saat memuat halaman, mohon maaf atas ketidaknyamanan ini.
        </Text>

        <Text size="md" c="gray" mt={8}>
          Anda dapat mencoba kembali dengan menekan tombol refresh pada browser, atau hubungi tim support kami jika
          masalah masih berlanjut.
        </Text>
        {isDev && error instanceof Error && !(error instanceof TypeError) && (
          <Accordion w="100%" mt={16}>
            <Accordion.Item value="error">
              <Accordion.Control>Detail Error</Accordion.Control>
              <Accordion.Panel>
                <Text size="md" c="gray" mt={8}>
                  {error.message}
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="stack">
              <Accordion.Control>Stack Trace</Accordion.Control>
              <Accordion.Panel>
                <Code component="pre" c="gray" mt={8}>
                  {JSON.stringify(error.cause, null, 2)}
                </Code>
                <Code component="pre" c="gray" mt={8}>
                  {JSON.stringify(error.stack, null, 2)}
                </Code>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        )}
        {error instanceof TypeError && (
          <Accordion w="100%" mt={16} defaultValue="error">
            <Accordion.Item value="error">
              <Accordion.Control>Detail Error</Accordion.Control>
              <Accordion.Panel>
                <Text size="md" c="gray" mt={8}>
                  Gagal memuat sebagian halaman, berkas yang dibutuhkan tidak ditemukan di server.
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        )}
      </Container>
    </Flex>
  );
};
