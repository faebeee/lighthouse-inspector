import { useResource } from "./use-resource";
import { VersionApiHandlerResponse } from "../../pages/api/meta/version";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import { THEME_NAME } from "../../config.web";

export const useVersion = () => {
    const version = useResource<VersionApiHandlerResponse>({ url: "/api/meta/version" });
    const [ notificationId, setNotificationId ] = useState<string | number | null>(null);
    useEffect(() => {
        if (version.data?.updateAvailable) {
            setNotificationId(toast.info(`New Version available ${ version.data.version }`, {
                closeOnClick: true,
                autoClose: false,
                position: "bottom-left",
                theme: THEME_NAME,
                onClick: () => {
                    window.open(`https://github.com/faebeee/lighthouse-inspector#update-docker`, "_blank");
                }
            }));
        }
        return () => {
            if (notificationId) {
                toast.dismiss(notificationId);
            }
        };
    }, [ version.data ]);
};
