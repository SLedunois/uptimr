import React, {useEffect, useState} from 'react';

declare const window: any;

export const useNotify = (event: string) => {
    const [notification, setNotification] = useState(undefined);

    const handleEvent = (e: CustomEvent) => setNotification(e.detail);

    useEffect(() => {
        window.addEventListener(event, handleEvent);

        return () => {
            window.removeEventListener(event, handleEvent);
        };
    }, []);

    return notification;
}

export function withNotify(endpoint: string, event: string, WrappedComponent: any) {
    return () => {
        useEffect(() => {
            const sse: EventSource = new EventSource(endpoint);
            sse.onmessage = (e) => {
                let detail = JSON.parse(e.data);
                window.dispatchEvent(new CustomEvent(event, {detail}));
            }
            sse.onerror = sse.close;
            return () => {
                sse.close();
            }
        })
        return (<WrappedComponent/>)
    }
}