import { type PropsWithChildren } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import classes from "./DefaultLayout.module.css";

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={classes.layout}>
      <ErrorBoundary>
        <main className={classes.main}>
          {children}
        </main>
      </ErrorBoundary>
    </div>
  );
};

DefaultLayout.displayName = "DefaultLayout";