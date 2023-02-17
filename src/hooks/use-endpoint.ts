"use client";

import useSWR from "swr";
import { useEffect, useState } from "react";

import axios from "axios";

export const swrFetcher = (config: { method: string, url: string; params: unknown, data?: object }) => {
    return axios({
        url: config.url,
        params: config.params,
        method: config.method,
        data: config.data
    })
        .then((res) => res.data)
        .catch((e) => {
            console.error(e);
            throw e;
        });
};

export type UseEndpointProps = {
    /**
     * URL of the endpoint
     */
    url: string;

    /**
     * Additional params for the API endpoint
     */
    params?: object;
};

export const useEndpoint = <T>({
                                   url,
                                   params = {}
                               }: UseEndpointProps, refreshInterval?: number) => {
    const [ data, setData ] = useState<T | null>(null);

    const {
        data: response,
        mutate,
        error,
        isLoading
    } = useSWR<T>(
        {
            url,
            params: {
                ...params
            }
        },
        swrFetcher,
        { refreshInterval }
    );

    useEffect(() => {
        if (!isLoading) {
            setData(response ?? null);
        }
    }, [ response ]);

    const call = (method: string, data?: object) => {
        return swrFetcher({ url, method, params, data });
    };

    return {
        data,
        call,
        error,
        mutate,
        isLoading
    };
};
