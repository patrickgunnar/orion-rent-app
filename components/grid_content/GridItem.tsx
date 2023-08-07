'use client'

import { CommentType, PropertyType } from "@/types";
import Image from "next/image";
import Button from "../buttons/Button";
import { useState, MouseEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GrStar } from "react-icons/gr";
import { handleRatesStar } from "../client_only/ClientOnly";


interface ContentItemProps {
    data: PropertyType
    comments: CommentType[]
}

interface CurrentDataProps {
    location: string
    price: string
}

// grid content item content
const ContentItem: React.FC<ContentItemProps> = ({
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

        // push to listings page
        router.push(`/listings/${data.id}`)
    }

    // render element
    return (
        <Button className="grid grid-cols-1 h-full w-full" onClick={(ev: any) => onClickHandler(ev)}>
            <div className="relative rounded-lg overflow-hidden shadow-[-0.1rem_0.25rem_0.2rem] 
                shadow-[#00000095] border-[#737373] border-[1px] aspect-square w-full">
                <Image className="object-cover" alt="Image" fill
                    src={data.cover_image}
                />
            </div>
            <div className="relative text-left text-black mt-2 px-1 h-fit w-full">
                <div className="flex justify-between items-center h-fit w-full">
                    <div className="relative text-lg 2xl:text-2xl font-semibold 
                    truncate capitalize w-[80%]">
                        {data.title}
                    </div>
                    <div className="flex justify-center items-center h-ft w-[10%]">
                        
                    </div>
                </div>
                <div className="text-sm 2xl:text-lg font-medium text-[#6c6c6c] capitalize">{currentData.location}</div>
                <div className="flex flex-row items-center text-sm 2xl:text-lg whitespace-pre-wrap">
                    <div className="flex justify-between items-center h-fit w-full">
                        <div className="relative text-base 2xl:text-xl font-semibold truncate w-[70%]">
                            {currentData.price}
                        </div>
                        <div className="flex justify-end items-center font-medium gap-2 h-fit w-[30%]">
                            <GrStar size={20} />
                            {handleRatesStar(comments).replace('.', ',')}
                        </div>
                    </div>
                </div>
            </div>
        </Button>
    );
}
 
export default ContentItem;
