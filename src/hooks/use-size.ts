import { useEffect, useState } from "react";

function getSize(element: HTMLElement) {
    const width = element?.offsetWidth;
    const height = element?.offsetHeight;
    return { height, width };
}

export function useSize(element: HTMLElement) {
    const [ size, setSize ] = useState(getSize(element));

    useEffect(() => {
        const onResize = () => setSize(getSize(element));
        window.addEventListener("resize", onResize);
        onResize();
        return () => window.removeEventListener("resize", onResize);
    }, [element]);

    return size;
}
