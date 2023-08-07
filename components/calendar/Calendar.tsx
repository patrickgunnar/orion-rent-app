'use client'

import { DateRange, Calendar } from "react-date-range";
import { ptBR } from "date-fns/locale";

import "./calendar_styles/styles.css"
import "./calendar_styles/default.css"


interface CalendarBoxProps {
    disabledDates: Date[]
    rangeColors: string[]
    direction: "vertical" | "horizontal"
}

const CalendarBox: React.FC<CalendarBoxProps> = ({
    disabledDates, rangeColors, direction
}) => {
    return (
        <div className="flex justify-center items-start h-full p-1 w-full">
            <Calendar rangeColors={rangeColors} className="h-fit w-full"
                disabledDates={disabledDates}
                direction={direction}
                dateDisplayFormat="d MMM yyyy"
                editableDateInputs={false}
                showDateDisplay={false}
                fixedHeight
                locale={ptBR}
                weekdayDisplayFormat="iiiiii"
                date={new Date()}
                minDate={new Date()}
                color={rangeColors[0]}
            />
        </div>
    );
}
 
export default CalendarBox;
