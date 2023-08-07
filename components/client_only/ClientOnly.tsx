'use client'

import { useEffect, useState } from "react";
import LoadingState from "./LoadingState";
import ContentState from "./ContentState";
import { CommentType, PropertyType } from "@/types";


interface ClientOnlyProps {
    properties: PropertyType[]
    comments: CommentType[]
    children: React.ReactNode
}

// rates start handler
export const handleRatesStar = (ratesArray: CommentType[]) => {
    // sum previous value to next value
    // devide the sum by the array length
    const sum = ratesArray.reduce((prev, current) => prev + current.stars_value, 0) / ratesArray.length || 0

    // return rounded value
    return `${(Math.round(sum * 10) / 10).toFixed(1)}`
}

// clients only content
const ClientOnly: React.FC<ClientOnlyProps> = ({
    properties, comments, children
}) => {
    // on client handler
    const [client, setClient] = useState<boolean>(false)

    // render elements only on client side
    useEffect(() => {
        // set client
        setClient(true)
    }, [])

    // render content
    return (
        client ? (
            <ContentState properties={properties} content={children} comments={comments} />
        ) : (
            <LoadingState />
        )
    )
}
 
export default ClientOnly;
