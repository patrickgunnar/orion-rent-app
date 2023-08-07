'use client'

import { useCallback, useState } from "react"
import Button from "../buttons/Button"
import clsx from "clsx"
import { GrStar } from "react-icons/gr"


interface InputStarProps {
    label: string
    value: number
    setStars: (stars: number) => void
}

// input star
const InputStar: React.FC<InputStarProps> = ({
    value, setStars, label
}) => {
    // use state to deal with hover
    const [currentHover, setCurrentHover] = useState<number>(0)

    // on change handler
    const handleChange = useCallback((stars: number) => {
        // if inputed stars is equal to value
        if(stars === value) setStars(0)
        // set stars value
        else setStars(stars)
    }, [value, setStars])

    // render content
    return (
        <div className="flex flex-col justify-center items-start mb-4 h-fit w-full">
            <div className="flex justify-start items-center text-base font-semibold text-black left-4 
            px-2 my-2 h-fit w-full">
                {label}
            </div>
            <div className="flex justify-start items-center gap-1 h-fit w-fit">
                <Button className={clsx("flex justify-center items-center w-6 aspect-square hover:text-black",
                (value > 0 && value >= 1) || (currentHover > 0 && currentHover >= 1) ? "text-black" : "text-[#737373]")} 
                onClick={() => handleChange(1)} onMouseEnter={() => setCurrentHover(1)} onMouseLeave={() => setCurrentHover(0)}>
                    <GrStar size={20} />
                </Button>
                <Button className={clsx("flex justify-center items-center w-6 aspect-square hover:text-black",
                (value > 0 && value >= 2) || (currentHover > 0 && currentHover >= 2) ? "text-black" : "text-[#737373]")} 
                onClick={() => handleChange(2)} onMouseEnter={() => setCurrentHover(2)} onMouseLeave={() => setCurrentHover(0)}>
                    <GrStar size={20} />
                </Button>
                <Button className={clsx("flex justify-center items-center w-6 aspect-square hover:text-black",
                (value > 0 && value >= 3) || (currentHover > 0 && currentHover >= 3) ? "text-black" : "text-[#737373]")} 
                onClick={() => handleChange(3)} onMouseEnter={() => setCurrentHover(3)} onMouseLeave={() => setCurrentHover(0)}>
                    <GrStar size={20} />
                </Button>
                <Button className={clsx("flex justify-center items-center w-6 aspect-square hover:text-black",
                (value > 0 && value >= 4) || (currentHover > 0 && currentHover >= 4) ? "text-black" : "text-[#737373]")} 
                onClick={() => handleChange(4)} onMouseEnter={() => setCurrentHover(4)} onMouseLeave={() => setCurrentHover(0)}>
                    <GrStar size={20} />
                </Button>
                <Button className={clsx("flex justify-center items-center w-6 aspect-square hover:text-black",
                (value > 0 && value >= 5) || (currentHover > 0 && currentHover >= 5) ? "text-black" : "text-[#737373]")} 
                onClick={() => handleChange(5)} onMouseEnter={() => setCurrentHover(5)} onMouseLeave={() => setCurrentHover(0)}>
                    <GrStar size={20} />
                </Button>
            </div>
        </div>
    );
}
 
export default InputStar;
