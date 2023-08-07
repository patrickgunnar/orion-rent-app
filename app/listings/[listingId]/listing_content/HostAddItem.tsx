'use client'

import Button from "@/components/buttons/Button"
import { handleRatesStar } from "@/components/client_only/ClientOnly"
import useHostAddModal from "@/hooks/useHostAddModal"
import { CommentType } from "@/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MouseEvent } from "react"
import { GrStar } from "react-icons/gr"


interface HostAddItemProps {
    id: string
    cover_image: string
    title: string
    location: string
    price: string
    rates: CommentType[]
}

const HostAddItem: React.FC<HostAddItemProps> = ({
    id, cover_image, title, location, price, rates
}) => {
    // get router
    const router = useRouter()
    // use host add modal
    const hostAddModal = useHostAddModal()

    // on click handler
    const onClickHandler = (ev: MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation()

        // push to listings page
        router.push(`/listings/${id}`)
        // reset user id
        hostAddModal.setUserId(null)
        // close modal
        hostAddModal.onClose()
    }

    return (
        <Button className="relative flex flex-col justify-start items-start h-full w-full" onClick={onClickHandler}>
            <div className="relative w-full aspect-square rounded-lg my-1 overflow-hidden">
                <Image className="object-cover"
                    src={cover_image}
                    alt={title}
                    fill
                />
            </div>
            <div className="relative truncate text-left text-sm text-black font-bold h-fit w-full">
                {title}
            </div>
            <div className="text-sm 2xl:text-lg font-medium text-[#6c6c6c] capitalize">{location}</div>
            <div className="flex justify-between items-center text-sm 2xl:text-lg h-fit w-full">
                <div className="relative text-base text-left 2xl:text-xl font-semibold truncate 
                h-fit w-[70%]">
                    {price}
                </div>
                <div className="flex justify-end items-center font-medium gap-2 h-fit w-[30%]">
                    <GrStar size={20} />
                    {handleRatesStar(rates).replace('.', ',')}
                </div>
            </div>
        </Button>
    );
}
 
export default HostAddItem;
