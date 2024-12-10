import { PropsWithChildren } from "react";

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      {children}
    </div>
  );
};