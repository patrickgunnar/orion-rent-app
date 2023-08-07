'use client'

import { useEffect, useState } from "react";


// get body height and width
const useBodyDimensions = () => {
    // width and height state
    const [height, setHeight] = useState<number>(0)
    const [width, setWidth] = useState<number>(0)

    // document body resize update handler
    const setBodyDimensionsHandler = () => {
        // set new height
        setHeight(document.body.clientHeight)
        // set new width
        setWidth(document.body.clientWidth)
    }

    // get document body dimentions
    useEffect(() => {
        // insert value
        setBodyDimensionsHandler()

        // add window resize event listener
        window.addEventListener('resize', setBodyDimensionsHandler)

        // on unmount
        return () => window.addEventListener('resize', setBodyDimensionsHandler)
    }, [])

    // return the height and width
    return { height, width };
}
 
export default useBodyDimensions;
