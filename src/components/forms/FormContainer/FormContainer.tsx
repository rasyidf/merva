import {
  Box,
  Divider,
  LoadingOverlay,
  LoadingOverlayProps,
  Paper,
  PaperProps,
  ScrollAreaProps
} from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { PropsWithChildren, ReactNode, useRef } from "react";
import { FormButton, FormButtonProps } from "../FormButtons";
import styles from "./FormContainer.module.scss";

type FormContainerProps = {
  isLoading?: boolean;
  hideButton?: boolean;
  containerProps?: PaperProps;
  scrollAreaProps?: ScrollAreaProps;
  formButtonProps?: FormButtonProps;
  overlayProps?: LoadingOverlayProps;
  loadingMessage?: ReactNode;
} & PropsWithChildren;

export function FormContainer({
  children,
  isLoading,
  hideButton,
  containerProps,
  formButtonProps,
  overlayProps,
  loadingMessage,
}: FormContainerProps) {
  const containerRefExit = useRef();
  const { ref: refExit, entry: entryExit } = useIntersection({
    root: containerRefExit.current,
    threshold: 0.5,
  });

  return (
    <Paper p={0} withBorder={true} mx="auto" {...containerProps}>
      <LoadingOverlay {...overlayProps} visible={isLoading || false} />
      <Box my={24}>{children}</Box>
      {!hideButton && (
        <>
          <Divider w="100%" my={16} color="gray.2" p={0} mx={0} />
          <Box
            opacity={entryExit?.isIntersecting ? 1 : 0}
            className={entryExit?.isIntersecting ? styles.footerRootDefault : styles.footerRoot}
          >
            <FormButton {...formButtonProps} />
          </Box>
          <Box ref={refExit} w={10} h={1} bg="gray.2" />
        </>
      )}
    </Paper>
  );
}
