'use client'

import CalendarBox from "@/components/calendar/Calendar"
import { GrStar } from "react-icons/gr"
import CommodityBox from "./CommodityBox"
import { BsCircleFill } from "react-icons/bs"


interface DescriptionBoxProps {
    title: string
    description: string
    price: string
    bedrooms: number
    bathrooms: number
    guests: number
    location: string
    star_rates: string
    favourite: boolean
    commodities: string[]
    reservation: Date[]
}

// description box
const DescriptionBox: React.FC<DescriptionBoxProps> = ({
    title, description, price, bedrooms, bathrooms,
    guests, location, star_rates, favourite, commodities, 
    reservation
}) => {
    // render content
    return (
        <div className="flex flex-col justify-start items-center p-2 h-fit w-full lg:w-[70%]">
            <div className="flex flex-col md:flex-row justify-start items-start md:items-center md:gap-4 h-fit w-full">
                <div className="flex text-left text-2xl font-bold px-4 md:px-0 md:pl-4 py-2 h-fit w-fit">
                    {title}
                </div>
                <BsCircleFill size={4} className="hidden md:flex" />
                <div className="flex flex-row justify-center items-center px-4 md:px-0 h-fit w-fit">
                    <div className="flex text-center text-xl font-medium h-fit w-fit">
                        {price}
                    </div>
                </div>
            </div>
            <div className="flex text-left text-base text-gray-600 font-normal px-4 pb-2 h-fit w-full">
                {location}
            </div>
            <div className="flex flex-row justify-between items-center h-fit w-full">
                <div className="flex flex-col md:flex-row h-fit w-fit">
                    <div className="flex text-left text-base font-bold px-4 h-fit w-full">
                        Rate:
                    </div>
                    <div className="flex flex-row justify-center items-center gap-2 h-fit w-full">
                        <GrStar size={20} />
                        {star_rates} stars
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-2 mb-8 h-fit w-full">
                <div className="flex text-left text-base font-bold px-4 h-fit w-full">
                    Commodities:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center px-4 h-fit w-full">
                    {
                        commodities.map((item, index) => <CommodityBox key={index} commodity={item} />)
                    }
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-2 mb-8 h-fit w-full">
                <div className="flex text-left text-base font-bold px-4 h-fit w-full">
                    Description:
                </div>
                <div className="flex flex-col justify-start items-center text-base text-left font-normal px-4 h-fit w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 text-center text-sm text-[#737373] font-bold uppercase
                    mb-5 h-fit w-full">
                        <div>{bedrooms} bedrooms</div>
                        <div>{bathrooms} guests</div>
                        <div>Up to {guests} guests</div>
                    </div>
                    {description}
                </div>
            </div>
            <div className="flex flex-col justify-start items-center gap-4 my-8 h-fit w-full md:w-[70%]">
                <div className="flex justify-center items-center text-center text-base font-bold 
                px-4 h-fit w-full">
                    Availability:
                </div>
                <div className="flex justify-center items-center h-fit w-full">
                    {
                        <CalendarBox rangeColors={['#c71e02', '#751a07', '#737373']}
                            direction="vertical"
                            disabledDates={reservation}
                        />
                    }
                </div>
            </div>
        </div>
    );
}
 
export default DescriptionBox;
