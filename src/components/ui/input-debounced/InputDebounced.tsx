import { TextInput } from "@/components/ui/text-input";
import { useDebouncedState } from "@mantine/hooks";
import clsx from "clsx";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SvgIcon } from "../icon";
import styles from "./InputDebounced.module.scss";

type InputDebouncedProps = {
  id?: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  placeholderKey?: string; // Key for translation
  debounceDelay?: number;
  radius?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

export const InputDebounced: React.FC<InputDebouncedProps> = ({
  id = "global-filter",
  className,
  value,
  onChange,
  placeholderKey = "filter.search", // Default translation key
  debounceDelay = 500, // Default debounce delay
  radius = "sm", // Default radius
  fullWidth = false, // Default width
}: InputDebouncedProps) => {
  const { t } = useTranslation();
  const [debouncedValue, setDebouncedValue] = useDebouncedState(value, debounceDelay);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setDebouncedValue(newValue);
  };

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <TextInput
      className={clsx(styles.InputDebounced, className)}
      id={id}
      onChange={handleChange}
      placeholder={t(placeholderKey, "Cari")}
      radius={radius}
      rightSection={<SvgIcon name="magnifyingGlass" width={16} height={16} />}
      size="md"
      style={{ flexGrow: 1 }}
      width={fullWidth ? "100%" : 100}
    />
  );
};
