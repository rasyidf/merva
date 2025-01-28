import {
  type NavigateFunction,
  type NavigateOptions,
  type To,
  useNavigate,
} from "react-router-dom";



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
