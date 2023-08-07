import ContentTable from "@/components/ContentTable";
import ListingClientOnly from "./listing_content/ListingClientOnly";
import PropertyContent from "./listing_content/PropertyContent";
import getAllProperties from "@/components/actions/getAllProperties";
import getHost from "@/components/actions/getHost";
import getPropertyComment from "@/components/actions/getPropertyComment";
import getUser from "@/components/actions/getUser";
import { CommentType } from "@/types";


interface IParams {
    listingId?: string
}

// listing page
const ListingPage = async (
    { params }: { params: IParams }
) => {
    // get current listings
    const currentProperty = (await getAllProperties(params))?.[0]

    // if not current property
    if(!currentProperty) return null

    // get host details
    const host = await getHost(currentProperty.user_id)

    // if not current host
    if(!host) return null

    // get property comments
    const propertyComments = await getPropertyComment(currentProperty.id)

    // if not comments
    if(!propertyComments) return null

    // get comment user
    const commentWithUser = await getUser(propertyComments)

    // if not comments with user
    if(!commentWithUser) return null

    // get all listings
    const allProperties = await getAllProperties({})

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
        <main className="relative my-3 h-fit w-full">
            <ContentTable>
                <ListingClientOnly>
                    <PropertyContent data={currentProperty} host={host} comments={commentWithUser} commentsToRates={comments} />
                </ListingClientOnly>
            </ContentTable>
        </main>
    );
}
 
export default ListingPage;
