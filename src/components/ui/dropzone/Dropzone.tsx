
import { apiFetch, logger, useAuth } from "@/shared/services";
import { APP_URL_API } from "@/shared/utils/constants";

import { ActionIcon, Flex, Image, LoadingOverlay, Stack, Text, Tooltip } from "@mantine/core";
import { Dropzone as BaseDropzone, DropzoneProps, FileRejection, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { ForwardRefRenderFunction, forwardRef, useRef, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { SvgIcon } from "../icon";

type Props = {
  label?: React.ReactNode;
  error?: string;
} & ControllerRenderProps<any, string> &
  DropzoneProps;

const Dropzone: ForwardRefRenderFunction<HTMLDivElement, Omit<Props, 'ref'>> = (props, ref) => {
  const { label, onDrop, onReject, onChange, value: initialValue, error, ...rest } = props;
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(initialValue);
  const [uploadedUrl, setUploadedUrl] = useState<string | undefined>(undefined);
  const [localError, setLocalError] = useState<string | undefined>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = async (acceptedFiles: File[]) => {
    setLocalError("");
    const file = acceptedFiles[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsLoading(true);
      const response = await apiFetch({
        path: `${APP_URL_API}/common/upload`,
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res: any) => {
          return res;
        })
        .finally(() => {
          setIsLoading(false);
        });
      if (response) {
        const data = await response.data;
        setUploadedUrl(data.data.url);
        onChange?.(data.data.url);
      } else {
        logger.error("Upload Failed", "No Response");
      }
    } catch (error) {
      logger.error("Upload Failed", error);
    }
  };

  const handleReject = (e: FileRejection[]) => {
    if (e[0]?.errors[0]?.code === "file-too-large") {
      setLocalError("Ukuran File terlalu besar");
    } else {
      setLocalError(e[0]?.errors[0]?.message);
    }
    onReject?.(e);
  };

  const handlePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = () => {
    setPreviewUrl(undefined);
    setUploadedUrl(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onChange?.("");
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handlePreview(file);
    }
  };

  const isPreviewAvailable = !!initialValue || !!uploadedUrl;

  return (
    <Stack gap={0} w="100%">
      {label}
      {isPreviewAvailable ? (
        <Flex pos="relative" direction="column" align="center">
          <Image
            width={80}
            mah={200}
            src={initialValue || uploadedUrl}
            alt="Preview"
            fit="contain"
            style={{ maxWidth: "100%", maxHeight: "100%", backgroundColor: "darkgrey" }}
            fallbackSrc={`https://placehold.co/600x400?text=${uploadedUrl}`}
          />
          <Tooltip label="Remove image">
            <ActionIcon
              variant="outline"
              onClick={handleDelete}
              color="red"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "transparent",
                border: "none",
                color: "red",
                cursor: "pointer",
              }}
            >
              <SvgIcon name="trash" width={16} height={16} />
            </ActionIcon>
          </Tooltip>
        </Flex>
      ) : (
        <BaseDropzone
          onDrop={(files) => {
            handleDrop(files);
            if (onDrop) {
              onDrop(files);
            }
          }}
          onReject={handleReject}
          maxSize={1 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          w="100%"
          h={240}
          styles={() => ({
            root: {
              borderColor: "#FFCC39",
              backgroundColor: "#FFF8E033",
              width: "100%",
            },
          })}
          {...rest}
          ref={ref}
        >
          <Flex pos="relative" direction="column" align="center">
            <BaseDropzone.Accept>
              <SvgIcon name="upload" width={128} height={128} color={"var(--mantine-color-blue-6)"} />
            </BaseDropzone.Accept>
            <BaseDropzone.Reject>
              <SvgIcon name="trash" width={128} height={128} color={"var(--mantine-color-red-6)"} />
            </BaseDropzone.Reject>
            <BaseDropzone.Idle>
              <SvgIcon name="uploadCloud" width={128} height={128} color={"var(--mantine-color-yellow-6)"} />
            </BaseDropzone.Idle>
            <LoadingOverlay visible={isLoading} />
            <Text size="md" fw={700} mt={24} fz={16}>
              Drag & drop files or{" "}
              <span style={{ color: "#FFCC39" }}>
                Browse <input type="file"
                  accept={"*"}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                />
              </span>
            </Text>
            <Text c="dimmed" fz={8} mt={8}>
              Supported formats: JPEG, PNG
            </Text>
          </Flex>
        </BaseDropzone>
      )}
      {(localError || error) && (
        <Text c="red" size="xs">
          {localError ?? error}
        </Text>
      )}
    </Stack>
  );
};

export default forwardRef(Dropzone);
