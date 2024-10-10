import { useNavigate, type To, type NavigateOptions } from "react-router-dom";

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
