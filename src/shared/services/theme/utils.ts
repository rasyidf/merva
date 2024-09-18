import { em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export function useRefinedResponsive(): {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWideScreen: boolean;
  isSmallMobile: boolean;
} {
  const isSmallMobile = useMediaQuery(`(max-width: ${em(320)})`, false) ?? false;
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`, false) ?? false;
  const isTablet = useMediaQuery(`(max-width: ${em(1024)})`, false) ?? false;
  const isDesktop = useMediaQuery(`(max-width: ${em(1280)})`, false) ?? false;
  const isWideScreen = useMediaQuery(`(max-width: ${em(1536)})`, false) ?? false;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isWideScreen,
    isSmallMobile,
  } as const;
}

export function useResponsive() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`, false) ?? false;
  const isTablet = useMediaQuery(`(max-width: ${em(1024)})`, false) ?? false;
  const isDesktop = useMediaQuery(`(max-width: ${em(1280)})`, false) ?? false;

  return { isMobile, isTablet, isDesktop } as const;
}
