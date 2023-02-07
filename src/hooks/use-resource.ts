"use client";

import useSWR from "swr";
import { useEffect, useState } from "react";

import axios from "axios";

export const swrFetcher = (config: { url: string; params: unknown }) => {
    return axios
        .get(config.url, { params: config.params })
        .then((res) => res.data)
        .catch((e) => {
            console.error(e);
            throw e;
        });
};
export const swrMutator = (url: string, data: object) => {
    return axios
        .post(url, data)
        .then((res) => res.data)
        .catch((e) => {
            console.error(e);
            throw e;
        });
};


export type UseResourceProps = {
    /**
     * URL of the endpoint
     */
    url: string;

    /**
     * Additional params for the API endpoint
     */
    params?: object;
};

export const useResource = <T>({
                                   url,
                                   params = {}
                               }: UseResourceProps, refreshInterval?: number) => {
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

    return {
        data,
        error,
        mutate,
        isLoading
    };
};
