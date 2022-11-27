import { useNavigate } from "react-router-dom";

export const redirectByWalletConnectionStatus = (status: string, currentPath: string) => {
    if (shouldRedirectByWalletConnectionStatusAndCurrentPath(status, "connected", currentPath, "/welcome")) {
        navigateTo("/sessions/opened"); // TODO change bc this will always redirect to /welcome even on sessions vote
    } else if (shouldRedirectByWalletConnectionStatusAndCurrentPath(status, "unavailable", currentPath, "/crypto-wallet/unavailable")) {
        navigateTo("/crypto-wallet/unavailable");
    } else if (shouldRedirectByWalletConnectionStatusAndCurrentPath(status, "initializing", currentPath, "/crypto-wallet/synchronisation")) {
        navigateTo("/crypto-wallet/synchronisation");
    } else if (shouldRedirectByWalletConnectionStatusAndCurrentPath(status, "notConnected", currentPath, "/crypto-wallet/connect")) {
        navigateTo("/crypto-wallet/connect");
    } else if (shouldRedirectByWalletConnectionStatusAndCurrentPath(status, "connecting", currentPath, "/crypto-wallet/connecting")) {
        navigateTo("/crypto-wallet/connecting");
    }
};

const statusEquals = (status: string, comparedTo: string) => {
    return status === comparedTo;
};

const currentPathIsNot = (currentPath: string, path: string) => {
    return currentPath !== path;
};

function shouldRedirectByWalletConnectionStatusAndCurrentPath(
    currentStatus: string,
    expectedStatus: string,
    currentPath: string,
    redirectionPath: string
): boolean {
    return statusEquals(currentStatus, expectedStatus) && currentPathIsNot(currentPath, redirectionPath);
}

export const navigateTo = (path: string) => {
    const navigate = useNavigate();
    navigate(path, { replace: true });
};