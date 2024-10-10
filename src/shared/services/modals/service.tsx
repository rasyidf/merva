import { Input } from "@mantine/core";
import { modals } from "@mantine/modals";
import type {
  ConfirmModalProps,
  ContextModalProps,
  DeleteModalProps,
  OnboardingModalProps,
  UploadModalProps,
} from "./ConfirmModalProps";

class ModalService {
  private static instance: ModalService;

  private constructor() {}

  public static getInstance(): ModalService {
    if (!ModalService.instance) {
      ModalService.instance = new ModalService();
    }
    return ModalService.instance;
  }

  // Confirm Modal
  public confirmModal({
    title = "Please confirm",
    message,
    onConfirm,
    onCancel,
    confirmLabel = "OK",
    cancelLabel = "Cancel",
    confirmProps = { variant: "filled" },
    cancelProps = { variant: "outline" },
  }: ConfirmModalProps) {
    modals.openConfirmModal({
      title,
      children: <p>{message}</p>,
      labels: { confirm: confirmLabel, cancel: cancelLabel },
      confirmProps,
      cancelProps,
      onConfirm: () => onConfirm?.(),
      onCancel: () => onCancel?.(),
    });
  }

  // Delete Modal (customized confirm modal)
  public deleteModal({ title = "Delete item", message, onConfirm, deleteLabel = "Delete" }: DeleteModalProps) {
    this.confirmModal({
      title,
      message,
      onConfirm,
      confirmLabel: deleteLabel,
      confirmProps: { color: "red", variant: "filled" },
    });
  }

  // Context Modal (for custom children like forms)
  public contextModal({ modalKey, title = "Custom modal", children, onConfirm }: ContextModalProps) {
    modals.openContextModal({
      modal: modalKey,
      title,
      innerProps: { children },
    });
  }

  // Upload Modal (for uploading and returning file names)
  public uploadModal({ title = "Upload Files", onUpload, confirmLabel = "Upload" }: UploadModalProps) {
    modals.open({
      title,
      children: (
        <div>
          {/* Placeholder for file input */}
          <Input
            type="file"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || []).map((file) => file.name);
              onUpload?.(files);
            }}
          />
        </div>
      ),
    });
  }

  // Onboarding Modal (pager/carousel)
  public onboardingModal({ steps, title = "Onboarding", onFinish, confirmLabel = "Next" }: OnboardingModalProps) {
    let stepIndex = 0;

    const showStep = () => {
      if (stepIndex < steps.length) {
        modals.openConfirmModal({
          title: `${title} (${stepIndex + 1}/${steps.length})`,
          children: steps[stepIndex],
          onConfirm: () => {
            stepIndex += 1;
            if (stepIndex < steps.length) {
              modals.closeAll();
              showStep();
            } else {
              onFinish?.();
              modals.closeAll();
            }
          },
        });
      }
    };

    showStep();
  }
}

export const modalService = ModalService.getInstance();
