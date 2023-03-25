import { useVersion } from "../hooks/use-version";
import { PropsWithChildren } from "react";

export type ShellProps = PropsWithChildren<{}>;

export const Shell = ({ children }: ShellProps) => {
    useVersion();
    return <>
        { children }
    </>;
};
