import { NavigateFunction } from "react-router-dom";

export const navigateTo = (path: string, navigateFunction: NavigateFunction) => {
    navigateFunction(path, { replace: true });
};