'use client'

import { CommentType, PropertyType } from "@/types";
import GalleryBox from "./GalleryBox";
import DescriptionBox from "./DescriptionBox";
import HostBox from "./HostBox";
import CommentBox from "./CommentBox";
import { MouseEvent, useEffect, useState } from "react";
import { handleRatesStar } from "@/components/client_only/ClientOnly";
import useImages from "@/hooks/useImages";
import useCommentModal from "@/hooks/useCommentModal";
import Button from "@/components/buttons/Button";
import { useUser } from "@/hooks/useUser";

import "photoswipe/dist/photoswipe.css";


interface PropertyContentProps {
    data: PropertyType
    host: { full_name: string, avatar_url: string }
    comments: CommentType[]
    commentsToRates: CommentType[]
}

interface CurrentDataProps {
    location: string
    phone: string
    price: string
    reservations: Date[]
    commodities: string[]
}

// property page
const PropertyContent: React.FC<PropertyContentProps> = ({
    data, host, comments, commentsToRates
}) => {
    // get current user
    const user = useUser()
    // use comment modal
    const commentModal = useCommentModal()

    // get listing images
    // format image data to get image path
    const imagesUrl = useImages(data.image_path)

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

            // not available reservation dates
            const reservations = data.reservation.map(item => new Date(item))
            // get property commodities
            const commodities =[...data.commodities]

            // format phone
            const phone = data.phone

            setCurrentData({
                location: location, phone: phone,
                price: priceFormatter.format(data.price),
                reservations: reservations, commodities: commodities
            })
        }
    }, [data])

    // if not listing data
    if(!currentData || !data) return null

    // handle comment
    const handleComment = (ev: MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation()
        
        if(user.userDetails) {
            // set property id
            commentModal.setPropertyId(data.id)
            // set user id
            commentModal.setUserId(user.userDetails.id)
            // open modal
            commentModal.onOpen()
        }
    }

    // render content
    return (
        <div className="relative flex flex-col justify-start items-center p-4 h-fit w-full">
            <div className="h-fit my-5 w-full">
                <GalleryBox title={data.title} images={imagesUrl} />
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-start my-5 lg:gap-[5%] lg:p-4 h-fit w-[95%]">
                <DescriptionBox
                    title={data.title}
                    description={data.description}
                    price={currentData.price}
                    bedrooms={data.roomcount}
                    bathrooms={data.bathroomcount}
                    guests={data.guestcount}
                    location={currentData.location}
                    star_rates={handleRatesStar(comments).replace('.', ',')}
                    favourite={true}
                    commodities={currentData.commodities}
                    reservation={currentData.reservations}
                />
                <div className="relative flex flex-col justify-start items-center p-2 h-fit w-full lg:w-[25%]">
                    <HostBox 
                        host={host}
                        phone={currentData.phone}
                        hostId={data.user_id}
                        comments={commentsToRates}
                    />
                </div>
            </div>
            {
                user.user && (
                    <Button className="flex justify-center items-center text-xs font-bold rounded-lg text-white
                    from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] shadow-[#00000080] 
                    border-[#737373] border-[1px] hover:from-[#c71e02] hover:to-[#c71e02] mt-7 lg:mt-0 p-2 
                    h-fit w-[50%] lg:w-[30%]" type="button" onClick={handleComment}>
                        Rate Property
                    </Button>
                )
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 
            gap-8 p-4 mt-12 mb-5 h-fit w-[95%]">
                {
                    comments.map(item => (<CommentBox key={item.id} comment={item} />))
                }
            </div>
        </div>
    );
}
 
export default PropertyContent;
