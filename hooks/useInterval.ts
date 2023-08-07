'use client'

import { useRef, useEffect, useState, useCallback } from "react";


interface CallbackType {
    (): void
}

// interval hook
const useInterval = (
    callback: () => void,
    delay: number
) => {
    // save callback
    const callbackRef = useRef<CallbackType>()
    // save interval
    const intervalRef = useRef<NodeJS.Timer>()
    // current interval state
    const [currentInterval, startCurrentInterval] = useState<number | null>(delay)

    // remember the callback
    useEffect(() => {
        // set callback function ref
        callbackRef.current = callback
    }, [callback])

    // stop current interval
    const stopCurrentInterval = useCallback(() => {
        // clear current interval
        clearInterval(intervalRef.current)
        // set current interval state to null
        startCurrentInterval(null)
    }, [])

    // start interval
    useEffect(() => {
        // callback handler
        const tick = () => {
            // if callback function ref
            // call it
            if(callbackRef.current) callbackRef.current()
        }

        // if current interval is not null
        if(currentInterval !== null) {
            // set current interval
            intervalRef.current = setInterval(tick, currentInterval)

            // on unmount
            // stop current interval
            return () => stopCurrentInterval()
            //return () => clearInterval(intervalRef.current)
        }
    }, [currentInterval, stopCurrentInterval])

    // return current interval and current delay handler
    return [startCurrentInterval, stopCurrentInterval]
}
 
export default useInterval;
