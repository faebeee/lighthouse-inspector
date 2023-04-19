import { BEACON_KEY } from "../../config";
import { useResource } from "./use-resource";
import { BeaconApiResponse } from "../../pages/api/meta/beacon";

export const useBeacon = <T>(key: BEACON_KEY, interval = 2000) => {
    const data = useResource<BeaconApiResponse>({ url: `/api/meta/beacon`, params: { key } }, interval);
    return {
        isLoading: data.isLoading,
        lastSeen: data.data?.date ? new Date(data.data?.date) : null,
        date: data.data?.date ? new Date(data.data?.date) : null,
        value: data.data?.value
    };
};
