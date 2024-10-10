import { useEffect, useCallback } from "react";
import { useBeforeUnload, useBlocker } from "react-router-dom";
import { modals } from "@mantine/modals";

export function usePrompt(message: string, when = true) {
  // Handle browser unload events
  useBeforeUnload(
    useCallback(
      (event) => {
        if (when) {
          event.preventDefault();
          event.returnValue = message;
        }
      },
      [when, message],
    ),
  );

  // Handle in-app navigation blocking
  const blocker = useBlocker(when);

  useEffect(() => {
    if (blocker.state === "blocked") {
      const handleBlockedNavigation = async () => {
        const confirmed = await new Promise<boolean>((resolve) => {
          modals.openConfirmModal({
            title: "Are you sure you want to leave?",
            children: message,
            labels: { confirm: "Yes", cancel: "No" },
            onConfirm: () => resolve(true),
            onCancel: () => resolve(false),
          });
        });

        if (confirmed) {
          blocker.proceed();
        } else {
          blocker.reset();
        }
      };

      handleBlockedNavigation();
    }
  }, [blocker, message]);
}
