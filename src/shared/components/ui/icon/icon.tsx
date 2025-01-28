import type { SVGProps } from "react";

import href from "@/shared/assets/icons/sprite.svg";
import { type IconName, iconNames } from "@/shared/assets/icons/types";
import clsx from "clsx";

import styles from "./Icon.module.css";

export { type IconName, href };

const sizeClassName = {
  font: "w-[1em] h-[1em]",
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-7 h-7",
} as const;

type Size = keyof typeof sizeClassName;

/**
 * Renders an SVG icon. The icon defaults to the size of the font. To make it
 * align vertically with neighboring text, you can pass the text as a child of
 * the icon and it will be automatically aligned.
 * Alternatively, if you're not ok with the icon being to the left of the text,
 * you need to wrap the icon and text in a common parent and set the parent to
 * display "flex" (or "inline-flex") with "items-center" and a reasonable gap.
 */
export function SvgIcon({
  name,
  size = "font",
  className,
  children,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: Size;
}) {
  const validName = iconNames.includes(name) ? name : "square";
  return (
    <svg
      width={16}
      height={16}
      {...props}
      className={clsx(sizeClassName[size], styles.icon, "inline self-center", className)}
    >
      <title>{validName}</title>
      <use href={`${href}#${validName}`} />
    </svg>
  );
}
