'use client'

interface ListingClientOnlyProps {
    children: React.ReactNode
}

// listing client only
const ListingClientOnly: React.FC<ListingClientOnlyProps> = ({
    children
}) => {
    // render content
    return (
        <>{children}</>
    );
}
 
export default ListingClientOnly;
