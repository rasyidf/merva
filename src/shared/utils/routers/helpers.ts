import {
  type NavigateFunction,
  type NavigateOptions,
  type To,
  useNavigate,
} from "react-router";
import { useViewNavigate } from "./index";

export { useViewNavigate };

export let globalNavigate: NavigateFunction;

export const GlobalHistory = () => {
  globalNavigate = useNavigate();
  return null;
};
