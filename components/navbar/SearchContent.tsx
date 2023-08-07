'use client'

import useSeachModal from "@/hooks/useSeachModal";
import Button from "../buttons/Button";
import { useSearchParams } from "next/navigation";
import qs from "query-string";
import clsx from "clsx";


// search elements
const SearchContent = () => {
    // use search modal hook
    const searchModal = useSeachModal()
    // params
    const params = useSearchParams()

    // current labels obj
    const currentLabels = {
        region: 'Destiny', guests: 'Guests', date: 'Period'
    }

    // if there's current params
    // parse the params string into obj
    if(params) {
        // get current params
        const getParams = qs.parse(params.toString())

        // if params values, get its values
        if(getParams.guestLocation) currentLabels.region = `${getParams.guestLocation}`
        if(getParams.guestNumber) currentLabels.guests = `${getParams.guestNumber}`
        if(getParams.guestStartDate && getParams.guestEndDate) {
            // split start and end date
            const start = new Date(`${getParams.guestStartDate}`).toLocaleDateString().split('/')
            const end = new Date(`${getParams.guestEndDate}`).toLocaleDateString().split('/')

            // get only the day and month from date
            currentLabels.date = `${start[0]}-${start[1]} to ${end[0]}-${end[1]}`
        }
    }

    // render content
    return (
        <div className="flex flex-row justify-center items-center overflow-hidden h-16 w-full">
            <Button className="flex flex-row justify-between items-center rounded-lg border-[1px] 
                shadow-[0_0.05rem_0.1rem] shadow-[#00000080] font-normal text-xs md:text-sm text-[#6c6c6c]
                from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b border-[#737373] 
                h-[70%] w-[90%] xl:w-[80%] hover:shadow-[0_0.05rem_0.4rem] overflow-hidden"
                onClick={searchModal.onOpen}>
                <div className={clsx("relative text-center truncate px-1 h-fit w-[30%]",
                currentLabels.guests !== 'Guests' && "text-xs text-black font-bold")}>
                    {currentLabels.guests}
                </div>
                <div className="bg-[#737373] h-[80%] w-[1px]" />
                <div className={clsx("relative text-center truncate px-1 h-fit w-[30%]",
                currentLabels.date !== 'Period' && "text-xs text-black font-bold")}>
                    {currentLabels.date}
                </div>
                <div className="bg-[#737373] h-[80%] w-[1px]" />
                <div className={clsx("relative text-center truncate px-1 h-fit w-[30%]",
                currentLabels.region !== 'Destiny' && "text-xs text-black font-bold")}>
                    {currentLabels.region}
                </div>
            </Button>
        </div>
    );
}
 
export default SearchContent;
