'use client'

import useCoverImage from "@/hooks/useCoverImage";
import GridItem from "./GridItem";
import { CommentType, PropertyType } from "@/types";


interface GridContentProps {
    properties: PropertyType[]
    comments: CommentType[]
}

// grid elements
const GridContent: React.FC<GridContentProps> = async ({
    properties, comments
}) => {
    // get public urls
    const propertiesWithImagesUrl = useCoverImage(properties)

    // render grid content
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            2xl:grid-cols-4 grid-flow-row gap-14 px-4 md:px-10 pb-10 h-fit w-full">
            {
                propertiesWithImagesUrl.map(item => (
                    <GridItem key={item.id}
                        data={item}
                        comments={comments.filter(comment => comment.property_id === item.id)}
                    />
                ))
            }
        </div>
    );
}
 
export default GridContent;
