import { IconName, SvgIcon } from "@/shared/components/ui/icon";
import { Code, Flex, Group, Text, TextInput } from "@mantine/core";
import { spotlight, Spotlight, SpotlightActionData } from "@mantine/spotlight";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./main-header.module.css";

const defaultActions: Array<SpotlightActionData & {
  icon?: IconName;
  description?: string;
  path: string;
}> = [
    { id: "dashboard", label: "Dashboard", description: "Go to dashboard", icon: "gauge", path: "/app/dashboard" },
    { id: "settings", label: "Settings", description: "Manage settings", icon: "settings", path: "/app/settings" },
    { id: "tasks", label: "Tasks", description: "View tasks", icon: "fileSpreadsheet", path: "/app/tasks" },
    { id: "users", label: "Users", description: "Manage users", icon: "users", path: "/app/users" },
    { id: "profile", label: "Profile", description: "View profile", icon: "user", path: "/app/profile" }
  ];

export const SpotlightBox = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filteredActions = useMemo(() =>
    defaultActions.filter(action =>
      action?.label?.toLowerCase().includes(query.toLowerCase().trim()) ||
      action.description?.toLowerCase().includes(query.toLowerCase().trim())
    ),
    [query]
  );

  const handleActionTrigger = (action: SpotlightActionData & { path: string }) => {
    if (action?.path) {
      navigate(action?.path);
      spotlight.close();
    }
  };

  return (
    <>
      <TextInput
        placeholder="Search..."
        size="sm"
        radius="xl"
        w={{ base: 150, sm: 250 }}
        leftSection={<SvgIcon name="magnifyingGlass" size={16} />}
        rightSectionWidth={64}
        rightSection={
          <Code >
            <Group gap={5} justify="center" className={classes.searchCode}>
              <Text fz={10}>⌘</Text>
              <Text fz={10}>K</Text>
            </Group>
          </Code>
        }
        styles={{ section: { pointerEvents: "none" } }}
        onClick={spotlight.open}
      />

      <Spotlight.Root
        query={query}
        onQueryChange={setQuery}
        shortcut={["mod + K"]}
        scrollable
        maxHeight="70vh"
        onSpotlightClose={() => setQuery("")}
      >
        <Spotlight.Search
          placeholder="Search..."
          leftSection={<SvgIcon name="magnifyingGlass" size={16} />}
        />

        <Spotlight.ActionsList>
          {filteredActions.length > 0 ? (
            filteredActions.map((action) => (
              <Spotlight.Action
                key={action.id}
                onClick={() => handleActionTrigger(action)}
              >
                <Flex gap="sm" align="center">
                  {action.icon && <SvgIcon name={action.icon} size={16} />}
                  <div>
                    <Text>{action.label}</Text>
                    {action.description && (
                      <Text size="xs" c="dimmed">
                        {action.description}
                      </Text>
                    )}
                  </div>
                </Flex>
              </Spotlight.Action>
            ))
          ) : (
            <Spotlight.Empty>No results found...</Spotlight.Empty>
          )}
        </Spotlight.ActionsList>
      </Spotlight.Root>
    </>
  );
};
