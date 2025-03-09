import { PageHeader } from "@/shared/components/groups/main-header";
import { Paper, Tabs } from "@mantine/core";
import { TaskForm } from "../components/TaskForm";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TaskTemplateSelector } from "../components/TaskTemplateSelector";
import { taskTemplates, applyTemplate } from "../data/taskTemplates";
import type { Task } from "../data/schema";
import { featureId } from "..";

export const EntityCreate = () => {
  const { t } = useTranslation(featureId);
  const [activeTab, setActiveTab] = useState<string>("blank");
  const [selectedTemplate, setSelectedTemplate] = useState<string>();

  const templateValues = useMemo(() => {
    if (!selectedTemplate) return undefined;
    const template = taskTemplates.find(t => t.id === selectedTemplate);
    if (template) {
      return applyTemplate(template) as Partial<Task>;
    }
    return undefined;
  }, [selectedTemplate]);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  return (
    <Paper p="md">
      <PageHeader
        title={t("tasks.create.title")}
        subtitle={t("tasks.create.subtitle")}
      />

      <Tabs value={activeTab} onChange={(value) => setActiveTab(value || "blank")} mt="md">
        <Tabs.List>
          <Tabs.Tab value="blank">Blank Task</Tabs.Tab>
          <Tabs.Tab value="template">Use Template</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="blank">
          <TaskForm mode="create" />
        </Tabs.Panel>

        <Tabs.Panel value="template">
          <TaskTemplateSelector
            value={selectedTemplate}
            onChange={handleTemplateChange}
          />
          {selectedTemplate && (
            <TaskForm
              mode="create"
              initialValues={templateValues}
            />
          )}
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};

export default EntityCreate;
