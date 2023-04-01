import { BEACON_KEY } from "../../config";
import { useResource } from "./use-resource";
import { BeaconApiResponse } from "../../pages/api/meta/beacon";

export const useBeacon = (key: BEACON_KEY, interval = 2000) => {
    const data = useResource<BeaconApiResponse>({ url: `/api/meta/beacon`, params: { key } }, interval);
    return {
        isLoading: data.isLoading,
        lastSeen: data.data?.lastSeen ? new Date(data.data?.lastSeen) : null
    };
};
