import { useEffect, useRef } from 'react';
import { DEFAULT_DELAY } from '../constants';

type CallbackFunction = () => void;

const useRefresh = (
    callback: CallbackFunction,
    delay: number = DEFAULT_DELAY,
    isStarted: boolean = false,
) => {
    const savedCallback = useRef<CallbackFunction | null>(null);

    useEffect(() => {
        if (isStarted) {
            savedCallback.current = callback;
        }
    }, [callback, isStarted]);

    useEffect(() => {
        if (isStarted) {
            const intervalId = setInterval(() => {
                if (savedCallback.current) {
                    savedCallback.current();
                }
            }, delay);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [delay, isStarted]);
};

export default useRefresh;
