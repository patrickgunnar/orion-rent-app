'use client'

import Image from "next/image";
import Button from "../buttons/Button";
import { CommentType, PropertyType, RatesType } from "@/types";
import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GrStar } from "react-icons/gr";
import { handleRatesStar } from "../client_only/ClientOnly";


interface SliderItemProps {
    data: PropertyType
    comments: CommentType[]
}

interface CurrentDataProps {
    location: string
    price: string
}

// slide item element
const SlideItem: React.FC<SliderItemProps> = ({
    data, comments
}) => {
    // get router
    const router = useRouter()

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

        // push to listing page
        router.push(`/listings/${data.id}`)
    }

    // render component
    return (
        <Button className="relative rounded-lg bg-[#737373] shadow-[-0.1rem_0.2rem_0.2rem] shadow-[#00000095]
            border-[#737373] border-[1px] mx-[5px] h-full md:w-[200px] 2xl:w-[230px] w-[170px] overflow-hidden"
            onClick={(ev: any) => onClickHandler(ev)}>
            <div className="relative h-full w-full">
                <Image className="object-cover" alt="Image" fill
                    src={data.cover_image}
                />
            </div>
            <div className="absolute bottom-0 text-[#bebebe] text-left pt-10 pb-3 px-4 from-transparent to-[#000000] 
                bg-gradient-to-b h-fit w-full">
                <div className="text-base font-semibold capitalize text-white relative truncate w-[80%]">
                    {data.title}
                </div>
                <div className="text-xs font-medium capitalize">{currentData.location}</div>
                <div className="flex justify-between items-center h-fit w-full">
                    <div className="text-sm font-semibold text-white relative truncate w-[70%]">
                        {currentData.price}
                    </div>
                    <div className="flex justify-end items-center font-medium gap-2 h-fit w-[30%]">
                        <GrStar size={20} />
                        {handleRatesStar(comments).replace('.', ',')}
                    </div>
                </div>
            </div>
        </Button>
    );
}
 
export default SlideItem;
