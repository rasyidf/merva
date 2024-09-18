import { ReactNode } from "react";

export interface ConfirmModalProps {
  title?: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmProps?: object;
  cancelProps?: object;
}
export interface DeleteModalProps {
  title?: string;
  message: string;
  onConfirm?: () => void;
  deleteLabel?: string;
}
export interface ContextModalProps {
  modalKey: string;
  title?: string;
  children: ReactNode;
  onConfirm?: () => void;
}
export interface UploadModalProps {
  title?: string;
  onUpload?: (fileNames: string[]) => void;
  confirmLabel?: string;
}
export interface OnboardingModalProps {
  steps: ReactNode[];
  title?: string;
  onFinish?: () => void;
  confirmLabel?: string;
}
