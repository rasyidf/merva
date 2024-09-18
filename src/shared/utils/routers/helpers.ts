import {
  Await as RrdAwait,
  LoaderFunctionArgs,
  NavigateFunction,
  NavigateOptions,
  To,
  defer,
  useLoaderData as useRrdLoaderData,
  useNavigate,
} from "react-router-dom";

export function useLoaderData<TLoader extends ReturnType<typeof deferredLoader>>() {
  return useRrdLoaderData() as ReturnType<TLoader>["data"];
}

export function deferredLoader<TData extends Record<string, unknown>>(dataFunc: (args: LoaderFunctionArgs) => TData) {
  return (args: LoaderFunctionArgs) =>
    defer(dataFunc(args)) as Omit<ReturnType<typeof defer>, "data"> & { data: TData; };
}

export interface AwaitResolveRenderFunction<T> {
  (data: Awaited<T>): React.ReactElement;
}

export interface AwaitProps<T> {
  children: React.ReactNode | AwaitResolveRenderFunction<T>;
  errorElement?: React.ReactNode;
  resolve: Promise<T>;
}

export function Await<T>(props: AwaitProps<T>): JSX.Element {
  return RrdAwait(props);
}

export function useViewNavigate() {
  const redirect = useNavigate();
  const viewNavigate = (newRoute: To, options?: NavigateOptions | undefined) => {
    if (document.startViewTransition) {
      return document.startViewTransition(() => {
        redirect(newRoute, options);
      });
    }
    return redirect(newRoute, options);
  };
  return viewNavigate;
}

export let globalNavigate: NavigateFunction;

export const GlobalHistory = () => {
  globalNavigate = useNavigate();

  return null;
};
