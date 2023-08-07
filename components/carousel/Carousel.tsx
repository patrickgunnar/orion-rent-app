'use client'

import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { ReactElement } from "react-markdown/lib/react-markdown";
import useInterval from "@/hooks/useInterval";
import useBodyDimensions from "@/hooks/useBodyDimensions";
import CarouselItem from "./CarouselItem";
import Button from "../buttons/Button";
import LoadingState from "../client_only/LoadingState";
import { useRouter } from "next/navigation";
import { CommentType, PropertyType } from "@/types";


interface CarouselProps {
    properties: PropertyType[] | []
    comments: CommentType[]
}

// carousel element
const Carousel: React.FC<CarouselProps> = ({
    properties, comments
}) => {
    // get router
    const router = useRouter()

    // carousel container ref
    const carouselContainerRef = useRef<HTMLDivElement>(null)
    // carousel content ref
    const carouselContentRef = useRef<HTMLDivElement>(null)

    // slides array
    const [containerItems, setContainerItems] = useState<ReactElement[]>([])
    // slides control buttons array
    const [containerButtons, setContainerButton] = useState<ReactElement[]>([])
    // control animation
    const [isAnimate, setIsAnimate] = useState<boolean>(false)
    // grab state
    const [grabStartState, setGrabStartState] = useState<boolean>(false)
    // on move state
    const [onMouseMoveState, setOnMouseMoveState] = useState<boolean>(false)
    // slide item state
    const [slideItem, setSlideItem] = useState<EventTarget | null>(null)
    // set first next call interval
    const [isFirstInterval, setIsFirstInterval] = useState<number | null>(0)
    // carousel path state
    const [currentPath, setCurrentPath] = useState({
        startPoint: 0, currentPoint: 0, storedPoint: 0, 
        movePoint: 0, activeIndex: 1, offsetWidth: 0,
        currentLeftClones: 2, currentRightClones: 2,
        currentObjCloned: 2
    })

    // get start and stop interval handlers from use interval hook
    const [startCurrentInterval, stopCurrentInterval] = useInterval(() => {
        // call next slide
        previousNextHandler('next')

        // if first interval is equal to start interval
        if(isFirstInterval === 0) {
            // set first interval to stop first interval
            setIsFirstInterval(1)
            // stop current interval
            stopCurrentInterval(null)
        }
    }, 50)

    // use effect to deal with the first interval
    useEffect(() => {
        // if first interval is set to stop first interval
        if(isFirstInterval === 1) {
            // set first interval to null
            setIsFirstInterval(null)
            // restart new interval
            startCurrentInterval(3000)
            // set animation to true
            setIsAnimate(true)
        }
    }, [isFirstInterval, startCurrentInterval])

    // get screen width
    const { width: currentScrenWidth } = useBodyDimensions()

    // set carousel item position style
    const positionStyleHandler = useCallback(() => {
        // if carousel content
        if(carouselContentRef.current) {
            // container items length
            const containerItemsLength = containerItems.length
            // current obj clones
            const currentObjCloned = currentPath.currentObjCloned
            // current obj clones - 1
            const beforeFirstValidIndex = currentObjCloned - 1
            // container's length - current obj clones
            const AfterLastValidIndex = containerItemsLength - currentObjCloned

            // if current path active index is less than the index before the first valid index
            // set active index to the index before the first valid index
            if(currentPath.activeIndex < beforeFirstValidIndex) currentPath.activeIndex = beforeFirstValidIndex
            // if current active index is greater than the index after the last valid index
            if(currentPath.activeIndex > AfterLastValidIndex) {
                // set current path active index to the index after the last valid index
                currentPath.activeIndex = AfterLastValidIndex
            }

            // set slides container style's transform - translate x
            carouselContentRef.current.style.transform = `translateX(${currentPath.storedPoint}px)`
        }
    }, [currentPath, containerItems.length])

    // center item handler
    const centerOnScreen = useCallback((itemWidth: number) => {
        // get current screen margin
        return ((currentScrenWidth - itemWidth) / 2)
    }, [currentScrenWidth])

    // current stored point value handler
    const currentStoredPointValueHandler = useCallback((offsetWidth: number, valueControl: number) => {
        // get screen margin
        const currentMargin = centerOnScreen(offsetWidth)

        // calc value
        return currentMargin - ((currentPath.activeIndex - valueControl) * offsetWidth)
    }, [centerOnScreen, currentPath])

    // get item by control button click
    const controlButtonClick = useCallback((event: MouseEvent<HTMLDivElement>, index: number) => {
        // set slide by index
        setCurrentPath({
            ...currentPath,
            activeIndex: index,
            storedPoint: currentStoredPointValueHandler(currentPath.offsetWidth, 0)
        })

        // set animation to true
        setIsAnimate(true)

        // set slide position
        positionStyleHandler()
    }, [currentPath, currentStoredPointValueHandler, positionStyleHandler])

    // next slide handler
    const nextSlideHandler = useCallback((offsetWidth: number) => {
        // set next slide
        setCurrentPath({
            ...currentPath,
            storedPoint: currentStoredPointValueHandler(offsetWidth, 1)
        })

        // set slide position
        positionStyleHandler()
    }, [currentPath, positionStyleHandler, currentStoredPointValueHandler])

    // previous slide handler
    const previousSlideHandler = useCallback((offsetWidth: number) => {
        // set previous slide
        setCurrentPath({
            ...currentPath,
            storedPoint: currentStoredPointValueHandler(offsetWidth, -1)
        })

        // set slide position
        positionStyleHandler()
    }, [currentPath, positionStyleHandler, currentStoredPointValueHandler])

    // on mouse move handler
    const onMouseMoveHandler = useCallback((event: MouseEvent<HTMLDivElement>) => {
        // get offset width
        const getClientX = event.clientX
        // set mouse move to true
        setOnMouseMoveState(true)

        // if slides container
        if(carouselContentRef.current) {
            // set current path move point
            currentPath.movePoint = getClientX - currentPath.startPoint
            // set current path stored point
            currentPath.storedPoint = getClientX - currentPath.currentPoint
            
            // set slide position
            positionStyleHandler()
        }
    }, [currentPath, positionStyleHandler])

    // set start position
    const setCurrentStartPath = useCallback((offsetWidth: number) => {
        // if slides container
        if(carouselContentRef.current) {
            // set path: start point and current point
            setCurrentPath({
                ...currentPath,
                startPoint: offsetWidth,
                currentPoint: offsetWidth - currentPath.storedPoint,
                offsetWidth: offsetWidth
            })
        }
    }, [currentPath])

    // on mouse down handler
    const onMouseDownHandler = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        // current target
        const currentItem = event.currentTarget

        // if slides container
        if(carouselContentRef.current) {
            // set start path
            setCurrentStartPath(currentItem.offsetWidth)
            // set current item
            setSlideItem(currentItem)
            // set grab state
            setGrabStartState(true)
            // set on mouse move to false
            setOnMouseMoveState(false)
        }
    }, [setCurrentStartPath])

    // turn animation off
    const turnAnimationOff = useCallback(() => {
        // get current obj value
        const currentObjCloned = currentPath.currentObjCloned
        // get current path active index value
        const activeIndex = currentPath.activeIndex
        // get container's items length
        const containerItemLength = containerItems.length

        // if current path active index is equal to (current obj clones - 1)
        if(activeIndex === (currentObjCloned - 1)) {
            // set current path active index to (container's length - 1) - current right clones
            currentPath.activeIndex = (containerItemLength - 1) - currentPath.currentRightClones

            // if current path active index is equal to (container's length - current obj clones)
        } else if(activeIndex === (containerItemLength - currentObjCloned)) {
            // set current path active index to current obj clones
            currentPath.activeIndex = currentObjCloned
        }

        // set animation to false
        setIsAnimate(false)
        // set current index
        setCurrentPath({ ...currentPath })
    }, [currentPath, containerItems.length])

    // on click handler
    const previousNextHandler = useCallback((state: string) => {
        // if slides container
        if(carouselContentRef.current) {
            // get first child width
            const offsetWidth = currentPath.offsetWidth

            // if previous
            if(state === 'previous') {
                // call previous slide handler
                previousSlideHandler(offsetWidth)

                // set current index
                setCurrentPath({
                    ...currentPath,
                    activeIndex: currentPath.activeIndex -= 1
                })
            }
            // else if next
            else if(state === 'next') {
                // call next slide handler
                nextSlideHandler(offsetWidth)

                // set current index
                setCurrentPath({
                    ...currentPath,
                    activeIndex: currentPath.activeIndex += 1
                })
            }

            // set animation to true
            setIsAnimate(true)
        }
    }, [currentPath, previousSlideHandler, nextSlideHandler])

    // handle click
    const onClickHandler = useCallback((product_id: string) => {
        // push to listing page
        if(!onMouseMoveState) router.push(`/listings/${product_id}`)
    }, [onMouseMoveState, router])

    // control animation event
    useEffect(() => {
        if(carouselContentRef.current) {
            carouselContentRef.current.addEventListener('transitionend', turnAnimationOff)
        }
    }, [turnAnimationOff])

    // control events listeners
    useEffect(() => {
        // listener controller
        const controller = new AbortController()
        // controller signal
        const { signal } = controller

        const onMouseUpOrLeaveHandler = (event: MouseEvent<HTMLDivElement>) => {
            // if slides container
            if(carouselContentRef.current && !controller.signal.aborted) {
                // abort conteroller
                controller.abort()
                // reset current item
                setSlideItem(null)
                // reset grab state
                setGrabStartState(false)

                // if current path move point is less than -150
                // call next slide
                if(currentPath.movePoint < -150) previousNextHandler('next')
                // if current path move point is greater than 150
                // call previous slide
                else if(currentPath.movePoint > 150) previousNextHandler('previous')
                // call style handler
                else positionStyleHandler()
                    
                // get offsetwidth
                const offsetWidth = event.currentTarget.offsetWidth

                // set current stored point
                setCurrentPath({
                    ...currentPath,
                    storedPoint: currentStoredPointValueHandler(offsetWidth, 0),
                    offsetWidth: offsetWidth,
                    movePoint: 0
                })
            }
        }

        // set cursor to pointer
        const handleCursorDefault = (ev: MouseEvent<HTMLDivElement>) => ev.currentTarget.style.cursor = 'pointer'

        // if grab set
        if(grabStartState) {
            // prevent default cursor on dragstart
            slideItem?.addEventListener('dragstart', (ev) => ev.preventDefault(), { signal })
            // set default cursor on dragend
            slideItem?.addEventListener('dragend', (ev: any) => handleCursorDefault(ev), { signal })
            // add on mouse move event listener
            slideItem?.addEventListener('mousemove', (ev: any) => onMouseMoveHandler(ev), { signal })
            // add on mouse up event listener
            slideItem?.addEventListener('mouseup', (ev: any) => onMouseUpOrLeaveHandler(ev), { signal })
            // add on mouse leave event listener
            slideItem?.addEventListener('mouseleave', (ev: any) => onMouseUpOrLeaveHandler(ev), { signal })
        }
    }, [
        grabStartState, slideItem, onMouseMoveHandler, currentPath, 
        positionStyleHandler, currentStoredPointValueHandler, previousNextHandler
    ])

    // use effect to handle the sliders and control buttons
    useEffect(() => {
        // current slides and control buttons array
        const currentItems: ReactElement[] = []
        const currentButtons: ReactElement[] = []

        // cloned slides
        const firstClonedSlides: ReactElement[] = []
        const lastClonedSlides: ReactElement[] = []

        // tempo array
        const temp_properties: PropertyType[] = properties.filter((_, index) => index <= 5)

        // loop over array, create item, clones and its control button
        // push item and control button into its arrays
        temp_properties.forEach((item, index) => {
            // ---------------------------------------------------------------
            //                   CLONED CAROUSEL ITEM
            // ---------------------------------------------------------------
            // if index is less than the current right clones number
            if(index < currentPath.currentRightClones) {
                // current last obj clone
                lastClonedSlides.push(<CarouselItem key={index} 
                    data={item}
                    onChange={() => onClickHandler(item.id)}
                    onMouseDown={onMouseDownHandler}
                    comments={comments.filter(comment => comment.property_id === item.id)}
                />)
            }

            // if index is greater or equal to the array length - current left clones number
            if(index >= (temp_properties.length - currentPath.currentLeftClones)) {
                // current first obj clone
                firstClonedSlides.push(<CarouselItem key={index + currentPath.currentLeftClones + currentPath.currentRightClones} 
                    data={item}
                    onChange={() => onClickHandler(item.id)}
                    onMouseDown={onMouseDownHandler}
                    comments={comments.filter(comment => comment.property_id === item.id)}
                />)
            }
            // ---------------------------------------------------------------
            //                          END
            // ---------------------------------------------------------------

            // current index plus current number of cloned obj
            const currentObjIndex = index + currentPath.currentObjCloned
            // current active index
            const activeIndex = currentPath.activeIndex
            // if current index is the same of current obj index
            const isCurrentActive = activeIndex === currentObjIndex

            // original carousel item, not the clone
            currentItems.push(
                <CarouselItem key={currentObjIndex} 
                    data={item}
                    onChange={() => onClickHandler(item.id)}
                    onMouseDown={onMouseDownHandler}
                    comments={comments.filter(comment => comment.property_id === item.id)}
                />
            )

            // current carousel control button
            currentButtons.push(
                <Button className={clsx("flex rounded-3xl drop-shadow-sm shadow-sm shadow-zinc-700 overflow-hidden my-1 mx-1 h-1 w-6",
                    isCurrentActive && "from-[#737373] to-[#c8c8c8] bg-gradient-to-b",
                    !isCurrentActive && "from-[#737373] to-[#c8c8c8] bg-gradient-to-t cursor-pointer"
                )} key={currentObjIndex + 9} disabled={isCurrentActive}>
                    <div className="h-full w-full" onClick={(ev) => controlButtonClick(ev, currentObjIndex)} />
                </Button>
            )
        })

        // set slides array, clones arrays and control buttons array
        // into its states
        setContainerItems([
            ...firstClonedSlides,
            ...currentItems,
            ...lastClonedSlides
        ])
        setContainerButton(currentButtons)
    }, [properties, comments, currentPath, onMouseDownHandler, controlButtonClick, onClickHandler])

    // handle with carousel ref
    const checkCarouselChildren = () => {
        // if slide container's first child
        if(carouselContentRef.current?.children[0]) {
            // set current stored point
            currentPath.storedPoint = currentStoredPointValueHandler(carouselContentRef.current?.children[0].getBoundingClientRect().width, 0)

            // call style handler
            positionStyleHandler()
        }

        // if carousel container
        if(carouselContainerRef.current) {
            carouselContainerRef.current.addEventListener('mouseover', () => {
                // stop current interval
                stopCurrentInterval(null)
            })

            // listener to the mouse enter
            carouselContainerRef.current.addEventListener('mouseenter', () => {
                // stop current interval
                stopCurrentInterval(null)
            })

            // listener to the mouse leave
            carouselContainerRef.current.addEventListener('mouseleave', () => {
                // start current interval
                startCurrentInterval(3000)
            })
        }
    }

    checkCarouselChildren()

    // if content items is 0, render loading
    if(containerItems.length === 0) return <LoadingState />

    // render elements
    return (
        <div className="relative mb-2 group mx-auto h-[245px] md:h-[285px] lg:h-[305px] xl:h-[305px] 2xl:h-[345px] w-[99.5%] overflow-hidden" 
            ref={carouselContainerRef}>
            <div className={clsx("flex flex-row h-[240px] md:h-[280px] lg:h-[300px] xl:h-[300px] 2xl:h-[340px] w-fit bg-transparent",
                    isAnimate && "transition-transform duration-1000", !isAnimate && "transition-none"
                )} ref={carouselContentRef}>
                {containerItems}
            </div>
            <div className="flex flex-row justify-center items-center h-[5px] w-full">
                {containerButtons}
            </div>
            <Button className="absolute top-[10px] left-0 opacity-100 lg:opacity-0 group-hover:opacity-100 from-[#00000080]
                to-transparent bg-gradient-to-r h-[220px] md:h-[260px] lg:h-[280px] xl:h-[280px] 2xl:h-[320px]
                w-6 md:w-10 lg:w-15 z-10" onClick={() => previousNextHandler('previous')}>
                <div className="flex justify-center items-center h-full w-full">
                    <HiChevronLeft className="text-zinc-100" size={30} />
                </div>
            </Button>
            <Button className="absolute top-[10px] right-0 opacity-100 lg:opacity-0 group-hover:opacity-100 from-[#00000080]
                to-transparent bg-gradient-to-l h-[220px] md:h-[260px] lg:h-[280px] xl:h-[280px] 2xl:h-[320px]
                w-6 md:w-10 lg:w-15 z-10" onClick={() => previousNextHandler('next')}>
                <div className="flex justify-center items-center h-full w-full">
                    <HiChevronRight className="text-zinc-100" size={30} />
                </div>
            </Button>
        </div>
    );
}
 
export default Carousel;
