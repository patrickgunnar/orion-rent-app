'use client'

import useCoverImage from "@/hooks/useCoverImage";
import { CommentType, PropertyType } from "@/types";
import HostAddItem from "./HostAddItem";


interface HostAddBoxProps {
    currentProperties: PropertyType[]
    comments: CommentType[]
}

// host box
const HostAddBox: React.FC<HostAddBoxProps> = ({
    currentProperties, comments
}) => {
    // get all images with images url
    const properties = useCoverImage(currentProperties)

    // brazilian currency formatter
    const priceFormatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP'
    })

    // render content
    return (
        properties ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-fit w-full">
                {
                    properties.map(item => (
                        <HostAddItem id={item.id} key={item.id}
                            cover_image={item.cover_image}
                            location={`${item.locationvalue.nome}, ${item.locationvalue.microrregiao.mesorregiao.UF.sigla}`}
                            price={priceFormatter.format(item.price)}
                            rates={comments.filter(comment => comment.property_id === item.id)}
                            title={item.title}
                        />
                    ))
                }
            </div>
        ) : (
            <div className="flex justify-center items-center text-[#737373] text-sm font-bold 
            text-center h-fit w-full">
                No Advertisements
            </div>
        ) 
    );
}
 
export default HostAddBox;
