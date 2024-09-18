import { SVGProps } from "react";
type Props = SVGProps<SVGSVGElement>;

const AppLogo = (props: Props) => {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" fill="none" width="48px" height="48px" {...props}>
    <path d="M44 225.198L85.4799 140.346L108.723 186.889L95.1347 214.815L44 225.198Z"
      fill="var(--mantine-primary-color-filled, #3A7FC4)" />
    <path d="M165.937 261L95.1347 119.938L118 74.5L185 210L165.937 261Z"
      fill="var(--mantine-primary-color-filled, #3A7FC4)" />
    <path d="M192.5 186.889L169 138L204.556 63.5L238.5 131L272 196L254.5 246L206 156L192.5 186.889Z"
      fill="var(--mantine-primary-color-filled, #3A7FC4)" />
    <path d="M44 225.198L85.4799 140.346L108.723 186.889L95.1347 214.815L44 225.198Z"
      stroke="var(--mantine-primary-color-filled, #3A7FC4)" />
    <path d="M165.937 261L95.1347 119.938L118 74.5L185 210L165.937 261Z"
      stroke="var(--mantine-primary-color-filled, #3A7FC4)" />
    <path d="M192.5 186.889L169 138L204.556 63.5L238.5 131L272 196L254.5 246L206 156L192.5 186.889Z"
      stroke="var(--mantine-primary-color-filled, #3A7FC4)" />
  </svg>;
};

export default AppLogo;