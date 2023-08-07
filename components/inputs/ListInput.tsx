'use client'

import { useCallback, useRef, useState } from "react"
import Button from "../buttons/Button"
import { GrFormClose } from "react-icons/gr"


interface ListInputProps {
    id: string
    label: string
    placeholder: string
    disabled?: boolean
    value: string[]
    onClick: (value: string[]) => void
    maxLength: number
}

// list input 
const ListInput: React.FC<ListInputProps> = ({
    id, label, placeholder, disabled, value, 
    onClick, maxLength
}) => {
    // input ref
    const currentInputRef = useRef<HTMLInputElement>(null)

    // use state to deal with commodity array
    const [commodities, setCommodities] = useState<string[]>(value.length > 0 ? value : [])

    // add commodity handler
    const handleAddCommodity = useCallback(() => {
        // if current input ref
        if(currentInputRef.current) {
            // get current input value
            const currentValue = currentInputRef.current.value

            // if current input value is higher than 0
            if(currentValue.length > 0) {
                // set commodities
                setCommodities([
                    ...commodities, currentValue
                ])

                // set on click handler
                onClick([
                    ...commodities, currentValue
                ])
            }
        }
    }, [commodities, onClick])

    // remove commodity handler
    const handleRemoveCommodity = useCallback((idx: number) => {
        // set commodities
        setCommodities([
            ...commodities.filter((item, index) => index !== idx)
        ])

        // set on click handler
        onClick([
            ...commodities.filter((item, index) => index !== idx)
        ])
    }, [commodities, onClick])

    // render elements
    return (
        <div className="flex flex-col justify-center items-center h-fit w-full">
            <div className="grid grid-cols-4 gap-2 gap-y-6 h-fit w-full">
                {
                    commodities.map((item, index) => (
                        <div className="flex flex-col justify-center items-start h-fit w-full
                        from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b
                        shadow-[0_0_0.2rem] overflow-hidden shadow-[#00000080] border-[#737373] 
                        border-[1px] rounded-lg p-2" key={index}>
                            <Button className="flex justify-center items-center aspect-square w-[13%]"
                            onClick={() => handleRemoveCommodity(index)}>
                                <GrFormClose className="h-full w-full" />
                            </Button>
                            {item}
                        </div>
                    ))
                }
            </div>
            <div className="flex flex-col justify-center items-center h-fit w-full">
                <div className="flex justify-start items-center text-base font-semibold
                text-black left-4 px-2 my-2 h-fit w-full">
                    {label}
                </div>
                <input className="flex justify-start items-center shadow-[0_0_0.2rem] overflow-hidden
                    shadow-[#00000080] border-[#737373] border-[1px] rounded-lg p-2 h-14 w-full"
                    id={id}
                    type="text"
                    placeholder={placeholder}
                    disabled={disabled}
                    ref={currentInputRef}
                    maxLength={maxLength}
                />
                <Button className="flex justify-center items-center rounded-lg text-white
                from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] 
                shadow-[#00000080] border-[#737373] border-[1px] hover:from-[#c71e02] 
                hover:to-[#c71e02] font-medium p-2 my-6 h-fit w-[50%] xl:w-[30%]" onClick={handleAddCommodity}>
                    Add
                </Button>
            </div>
        </div>
    );
}
 
export default ListInput;
