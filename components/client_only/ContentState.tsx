'use client'

import { CommentType, PropertyType } from "@/types";
import ContentTable from "../ContentTable";
import Carousel from "../carousel/Carousel";
import Slider from "../slider/Slider";
import useCoverImage from "@/hooks/useCoverImage";


interface ContentStateProps {
    properties: PropertyType[]
    comments: CommentType[]
    content: React.ReactNode
}

// content client only
const ContentState: React.FC<ContentStateProps> = ({
    properties, comments, content
}) => {
    // get public urls
    const propertiesWithImagesUrl = useCoverImage(properties)

    // render content
    return (
        <>
            <Carousel properties={propertiesWithImagesUrl} comments={comments} />
            <ContentTable>
                <div className="relative rounded-t-lg from-[#d6d1d1] via-[#F0EBEB] to-[#c7c3c3] 
                    bg-gradient-to-b h-fit w-full">
                    <Slider properties={propertiesWithImagesUrl} comments={comments} />
                </div>
                <div className="relative h-fit w-full">
                    {content}
                </div>
            </ContentTable>
        </>
    );
}
 
export default ContentState;
