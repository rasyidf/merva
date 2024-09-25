import { Code, rem, TextInput } from "@mantine/core";
import { spotlight, Spotlight } from "@mantine/spotlight";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";
import classes from "./main-header.module.css";

const data = ["Dashboard", "Settings", "Logout", "Tasks", "Users"];
export const SpotlightBox = () => {
  const [query, setQuery] = useState("");

  const items = data
    .filter((item) => item.toLowerCase().includes(query.toLowerCase().trim()))
    .map((item) => <Spotlight.Action key={item} label={item} />);

  return <>
    <TextInput
      placeholder="Cari"
      size="xs"
      radius="lg"
      leftSection={<MagnifyingGlass style={{ width: rem(12), height: rem(12) }} weight="bold" />}
      rightSectionWidth={70}
      rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
      styles={{ section: { pointerEvents: "none" }, input: { border: "none" } }}
      my="sm"
      onClick={spotlight.open}
    />

    <Spotlight.Root query={query} onQueryChange={setQuery}>
      <Spotlight.Search placeholder="Cari..." leftSection={<MagnifyingGlass />} />
      <Spotlight.ActionsList>
        {items.length > 0 ? items : <Spotlight.Empty>Tidak Ditemukan Apapun...</Spotlight.Empty>}
      </Spotlight.ActionsList>
    </Spotlight.Root>
  </>;
};