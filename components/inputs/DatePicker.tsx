'use client'

import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { enGB } from "date-fns/locale";

import "./calendar_styles/styles.css"
import "./calendar_styles/default.css"


interface DatePickerProps {
    rangeColors: string[]
    direction: "vertical" | "horizontal"
    value: Range
    disabledDates: Date[]
    onChange: (value: RangeKeyDict) => void
}

// date picker component
const DatePicker: React.FC<DatePickerProps> = ({
    rangeColors, direction, value, disabledDates, onChange
}) => {
    // render elements
    return (
        <div className="flex justify-center items-start h-full p-1 w-full">
            <DateRange rangeColors={rangeColors} className="h-fit w-full"
                dateDisplayFormat="d MMM yyyy"
                editableDateInputs={false}
                showDateDisplay={false}
                fixedHeight
                locale={enGB}
                weekdayDisplayFormat="iiiiii"
                ranges={[value]}
                date={new Date()}
                onChange={onChange}
                direction={direction}
                minDate={new Date()}
                disabledDates={disabledDates}
            />
        </div>
    );
}
 
export default DatePicker;
