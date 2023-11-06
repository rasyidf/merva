import { useNavigate, To, NavigateOptions } from "react-router-dom";

export function useViewNavigate() {
    const redirect = useNavigate();
    const viewNavigate = (newRoute: To, options?: NavigateOptions | undefined) => {
        if (!document.startViewTransition) {
            return redirect(newRoute, options);
        } else {
            return document.startViewTransition(() => {
                redirect(newRoute, options);
            });
        }
    };
    return viewNavigate;
}