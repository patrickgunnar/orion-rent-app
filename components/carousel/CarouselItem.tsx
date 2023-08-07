'use client'

import { CommentType, PropertyType } from "@/types";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import Button from "../buttons/Button";
import { GrStar } from "react-icons/gr";
import { handleRatesStar } from "../client_only/ClientOnly";


interface CarouselItemProps {
    data: PropertyType
    comments: CommentType[]
    onChange: () => void
    onMouseDown: (event: MouseEvent<HTMLButtonElement>) => void
}

interface CurrentDataProps {
    location: string
    price: string
}

// carousel item element
const CarouselItem: React.FC<CarouselItemProps> = ({
    data, comments, onChange, onMouseDown
}) => {
    // use state to handle the data
    const [currentData, setCurrentData] = useState<CurrentDataProps | null>(null)

    useEffect(() => {
        // if not listing data
        if(data) {
            // get current location name, state
            const location = `${data.locationvalue.nome}, ${data.locationvalue.microrregiao.mesorregiao.UF.sigla}`
            // brazilian currency formatter
            const priceFormatter = new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP'
            })

            setCurrentData({
                location: location,
                price: priceFormatter.format(data.price)
            })
        }
    }, [data])

    // if not listing data
    if(!currentData || !data) return null

    // on click handler
    const onClickHandler = (ev: MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation()

        // handle click
        onChange?.()
    }

    // render carousel item
    return (
        <div className="flex justify-center items-center h-full w-[235px] md:w-[700px] xl:w-[900px] 2xl:w-[1000px]">
            <Button className="relative cursor-pointer active:cursor-grabbing rounded-lg shadow-[-0.1rem_0.3rem_0.25rem]
                shadow-[#00000085] border-[#737373] border-[1px] h-[220px] md:h-[260px] lg:h-[280px] xl:h-[280px] 
                2xl:h-[320px] overflow-hidden w-[230px] md:w-[690px] xl:w-[890px] 2xl:w-[990px]"
                onMouseDown={(event) => onMouseDown(event)} onClick={(ev: any) => onClickHandler(ev)}>
                <div className="relative w-full h-full">
                    <Image className="object-cover" alt='Image' fill
                        src={data.cover_image}
                    />
                </div>
                <div className="absolute bottom-0 text-left text-[#bebebe] pt-10 pb-3 px-4 from-transparent to-[#000000f7] 
                    bg-gradient-to-b h-fit w-full">
                    <div className="text-xl font-bold capitalize text-white relative truncate w-[85%]">
                        {data.title}
                    </div>
                    <div className="text-sm font-medium capitalize">{currentData.location}</div>
                    <div className="flex justify-between items-center h-fit w-full">
                        <div className="text-base font-bold text-white relative truncate w-[70%]">
                            {currentData.price}
                        </div>
                        <div className="flex justify-end items-center font-medium gap-2 h-fit w-[30%]">
                            <GrStar size={20} />
                            {handleRatesStar(comments).replace('.', ',')}
                        </div>
                    </div>
                </div>
            </Button>
        </div>
    );
}
 
export default CarouselItem;
