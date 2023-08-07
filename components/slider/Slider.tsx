'use client'

import SlideItem from "./SlideItem";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import LoadingState from "../client_only/LoadingState";
import { CommentType, PropertyType } from "@/types";


interface SliderProps {
    properties: PropertyType[] | []
    comments: CommentType[]
}

// slider element
const Slider: React.FC<SliderProps> = ({
    properties, comments
}) => {
    // slider container's ref
    const sliderContainerRef = useRef<HTMLDivElement>(null)

    // slides array
    const [sliderItems, setSliderItems] = useState<ReactElement[]>([])

    // pause animation handler
    const pauseAnimation = useCallback((ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // pause to animation play state
        ev.currentTarget.style.animationPlayState = 'paused'
    }, [])
        
    // unpause animation handler
    const unpauseAnimation = useCallback((ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // unpause to animation play state
        ev.currentTarget.style.animationPlayState = 'running'
    }, [])

    // use effect to add events
    useEffect(() => {
        // if slider container's ref
        if(sliderContainerRef.current && sliderItems.length > 0) {
            // add listener to the mouse enter event
            sliderContainerRef.current.addEventListener('mouseenter', (ev: any) => {
                // pause animation
                pauseAnimation(ev)
            })

            // add listener to the mouse leave event
            sliderContainerRef.current.addEventListener('mouseleave', (ev: any) => {
                // unpause animation
                unpauseAnimation(ev)
            })

            // add listener to the mouse over
            sliderContainerRef.current.addEventListener('mouseover', (ev: any) => {
                // pause animation
                pauseAnimation(ev)
            })

            // add listener to the mouse out
            sliderContainerRef.current.addEventListener('mouseout', (ev: any) => {
                // unpause animation
                unpauseAnimation(ev)
            })
        }
    }, [pauseAnimation, unpauseAnimation, sliderItems])

    // set current elements
    useEffect(() => {
        // current slides container
        const currentItems: ReactElement[] = []
        // current cloned slides container
        const currentClones: ReactElement[] = []

        // temp array
        const temp_properties = properties.filter((_, index) => index <= 15)

        temp_properties.forEach((item, index) => {
            // push current item into currentItems
            currentItems.push(
                <SlideItem key={index} 
                    data={item} 
                    comments={comments.filter(comment => comment.property_id === item.id)}
                />
            )
            // push current clone into currentClones
            currentClones.push(
                <SlideItem key={`cloned-item-${index}`} 
                    data={item}
                    comments={comments.filter(comment => comment.property_id === item.id)}
                />
            )
        })

        // set current items and current clones into slides state
        setSliderItems([
            ...currentItems,
            ...currentClones
        ])
    }, [properties, comments])

    // if slider items is 0, render loading
    if(sliderItems.length === 0) return <LoadingState />

    // render component
    return (
        <div className="relative group h-fit w-full">
            <div className="flex flex-col items-start bg-transparent mx-auto overflow-hidden 
                md:h-[220px] 2xl:h-[250px] h-[190px] w-full">
                <div className="flex flex-row items-start my-auto md:h-[200px] 2xl:h-[230px] h-[170px] w-fit
                    animate-scroll" ref={sliderContainerRef}>
                    {sliderItems}
                </div>
            </div>
        </div>
    );
}
 
export default Slider;
