import { Card, Divider, InputWrapper, Stack, Text, Title } from "@mantine/core";
import type { PropsWithChildren, ReactNode } from "react";

export const DetailCard = ({ children }: PropsWithChildren) => {
  return (
    <Card withBorder radius={8}>
      {children}
    </Card>
  );
};

export const DetailCardTitle = ({
  title,
  order = 1,
  px = 24,
}: {
  title: string;
  order?: number;
  px?: number;
}) => {
  return (
    <Card.Section>
      {order === 2 && <Divider mt={16} />}
      <Title py={14} px={px} order={6}>
        {title}
      </Title>
      {order === 1 && <Divider mb={16} />}
    </Card.Section>
  );
};

export const DetailCardItem = ({ title, children }: PropsWithChildren & { title: string }) => {
  return (
    <InputWrapper label={title}>
      <Text c="tertiary.6">{children}</Text>
    </InputWrapper>
  );
};

export const DetailBuilder = ({
  data,
  metaData,
}: {
  data: Record<string, string | number | undefined>;
  metaData: Record<
    string,
    {
      title?: string;
      type?: "date" | "currency" | "text";
    }
  >;
}) => {
  return (
    <Card.Section>
      <Stack gap={16} mb={24} px={24}>
        {Object.keys(data).map((key, index) => {
          return (
            <DetailCardItem title={metaData[key]?.title || key} key={`${metaData[key]?.title}-${index}`}>
              {formatText(data?.[key]) || "-"}
            </DetailCardItem>
          );
        })}
      </Stack>
    </Card.Section>
  );
};

function formatText(arg0: string | number | undefined): ReactNode {
  if (arg0 === undefined) {
    return "-";
  }

  if (typeof arg0 === "number") {
    return arg0.toLocaleString();
  }

  if (typeof arg0 === "string") {
    const split = arg0.split("\n");
    return (
      <>
        {split.map((item, index) => (
          <Text key={`${arg0.length}index${index}`}>{item}</Text>
        ))}
      </>
    );
  }

  return arg0;
}

DetailCard.Item = DetailCardItem;
DetailCard.Title = DetailCardTitle;
DetailCard.Builder = DetailBuilder;
