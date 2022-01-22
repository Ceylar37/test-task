import {useCallback, useRef} from "react";

export const useDebounce = (callback: Function, delay: number) => {
    const timer = useRef<ReturnType<typeof setTimeout>>()

    return useCallback((...args) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }

        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay])
}