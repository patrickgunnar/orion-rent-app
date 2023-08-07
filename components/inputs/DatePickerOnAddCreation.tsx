'use client'

import { useCallback, useState } from "react";
import Button from "../buttons/Button";
import DatePicker from "./DatePicker";
import { Range } from "react-date-range";
import { eachDayOfInterval } from "date-fns";


interface DatePickerOnAddCreationProps {
    reservationValue: Date[]
    onClick: (value: Date[]) => void
}

// date picker on add creation
const DatePickerOnAddCreation: React.FC<DatePickerOnAddCreationProps> = ({
    reservationValue, onClick
}) => {
    // use state to deal with date range
    const [currentValue, setCurrentValue] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    // handle on click
    const onClickHandler = useCallback(() => {
        // if there's current value start and end dates
        if(currentValue.startDate && currentValue.endDate) {
            // set selected dates
            onClick([
                ...reservationValue,
                ...eachDayOfInterval({
                    start: new Date(currentValue.startDate.toString()),
                    end: new Date(currentValue.endDate.toString())
                })
            ])
        }
    }, [onClick, reservationValue, currentValue])

    // reset handler
    const handleReset = useCallback(() => {
        // clean dates
        onClick([])
    }, [onClick])

    // render content
    return (
        <div className="flex flex-col justify-center items-start h-fit w-full">
            <div className="flex justify-start items-center text-base font-semibold
            text-black left-4 px-2 mt-2 mb-4 h-fit w-full">
                Select the unavailable dates
            </div>
            <div className="flex justify-center items-center text-sm text-gray-500 font-medium 
            left-4 px-2 mt-2 mb-4 h-fit w-full">
                Do not select any date if all dates are available
            </div>
            <div className="flex flex-col xl:flex-row justify-center items-start h-fit w-full">
                <div className="flex flex-col justify-center items-center h-fit w-full xl:w-[50%]">
                    <DatePicker rangeColors={['#c71e02', '#751a07', '#737373']}
                        value={currentValue}
                        direction="vertical"
                        disabledDates={reservationValue}
                        onChange={(value) => setCurrentValue(value.selection)}
                    />
                    <div className="flex justify-center items-center h-fit w-full">
                        <Button className="flex justify-center items-center rounded-lg text-white text-xs
                        from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] mx-4
                        shadow-[#00000080] border-[#737373] border-[1px] hover:from-[#c71e02] 
                        hover:to-[#c71e02] font-medium p-2 my-6 h-fit w-[30%]" onClick={handleReset}>
                            Reset
                        </Button>
                        <Button className="flex justify-center items-center rounded-lg text-white text-xs
                        from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] mx-4
                        shadow-[#00000080] border-[#737373] border-[1px] hover:from-[#c71e02] 
                        hover:to-[#c71e02] font-medium p-2 my-6 h-fit w-[30%]" onClick={onClickHandler}>
                            Add
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center h-fit w-full xl:w-[50%]">
                    <div className="flex justify-start items-center text-base font-semibold
                    text-black left-4 px-2 mt-2 mb-4 h-fit w-full">
                        Unavailable dates
                    </div>
                    {
                        reservationValue.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 px-2 h-fit w-full">
                                {
                                    reservationValue.map((item, index) => (
                                        <div className="p-2 text-xs text-center font-medium drop-shadow-[0_0_0.05rem] rounded-lg
                                        shadow-[#00000080] from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b"
                                            key={index}>
                                            {item.toLocaleDateString()}
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className="flex justify-center items-center text-sm text-gray-500 font-medium h-fit w-full">
                                No selected dates
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
 
export default DatePickerOnAddCreation;
