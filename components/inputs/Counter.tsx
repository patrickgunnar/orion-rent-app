'use client'

import { useCallback, useEffect, useState } from "react"
import { IconType } from "react-icons"
import Button from "../buttons/Button"


interface CounterProps {
    contentClassName: string
    buttonsClassName: string
    valueClassName: string
    value: number
    onChange: ((value: number) => void)
    leftIcon: IconType
    rightIcon: IconType
}

// counter element
const Counter: React.FC<CounterProps> = ({
    contentClassName, buttonsClassName, valueClassName, 
    value, onChange, leftIcon: Left, rightIcon: Right
}) => {
    // use state to handle the mouse press keep
    const [onMouseDownAdd, setOnMouseDownAdd] = useState<boolean>(false)
    const [onMouseDownRemove, setOnMouseDownRemove] = useState<boolean>(false)

    // sum handler
    const handleSum = useCallback(() => onChange(value + 1), [onChange, value])

    // subtraction handler
    const handleSubtraction = useCallback(() => {
        // if value is 1, return
        if(value === 0) return

        // subtraction 1
        onChange(value - 1)
    }, [onChange, value])

    // handle mouse down and up to add
    const handleMouseDownUpAdd = useCallback(() => setOnMouseDownAdd(!onMouseDownAdd), [onMouseDownAdd])
    // handle mouse down and up to remove
    const handleMouseDownUpRemove = useCallback(() => setOnMouseDownRemove(!onMouseDownRemove), [onMouseDownRemove])

    // deal with the mouse press keep time
    useEffect(() => {
        // set interval
        const timer = setInterval(() => {
            // handle the sum
            if(onMouseDownAdd) handleSum()
            // handle the subtraction
            if(onMouseDownRemove) handleSubtraction()
        }, 150)

        // on mouse up, clear the interval
        if(!onMouseDownAdd && !onMouseDownRemove) clearInterval(timer)
        
        // on unmount
        return () => clearInterval(timer)
    }, [handleSubtraction, handleSum, onMouseDownRemove, onMouseDownAdd])

    // render content
    return (
        <div className={contentClassName}>
            <Button className={buttonsClassName} onClick={handleSubtraction} 
            onMouseDown={handleMouseDownUpRemove} onMouseUp={handleMouseDownUpRemove}>
                <Left />
            </Button>
            <div className={valueClassName}>
                {value}
            </div>
            <Button className={buttonsClassName} onClick={handleSum} 
            onMouseDown={handleMouseDownUpAdd} onMouseUp={handleMouseDownUpAdd}>
                <Right />
            </Button>
        </div>
    );
}
 
export default Counter;
