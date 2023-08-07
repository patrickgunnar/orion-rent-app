import getAllProperties, { SearchListingsParams } from "@/components/actions/getAllProperties";
import getPropertyComment from "@/components/actions/getPropertyComment";
import ClientOnly from "@/components/client_only/ClientOnly";
import GridContent from "@/components/grid_content/GridContent";
import { CommentType } from "@/types";
import { IconType } from "react-icons";


export interface CommodityIconType {
    title: string
    id: string
    icon: IconType
}

interface HomeProps {
    searchParams: SearchListingsParams
}

// main page elements
export default async function Home({ searchParams }: HomeProps) {
    // get all listings
    const allProperties = await getAllProperties(searchParams)

    // if properties is null
    if(!allProperties) return null

    // coments
    const comments: CommentType[] = []

    // loop through properties to get its comments
    for(let item of allProperties) {
        // get current values
        const currentComments = await getPropertyComment(item.id)

        // push the objs
        currentComments?.forEach(comment => comments.push(comment))
    }
    
    // render content
    return (
        <ClientOnly properties={allProperties} comments={comments}>
            <main className="relative my-3 h-fit w-full">
                <GridContent properties={allProperties} comments={comments} />
            </main>
        </ClientOnly>
    );
}
