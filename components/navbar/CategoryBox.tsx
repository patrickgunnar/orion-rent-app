'use client'

import clsx from "clsx";
import { IconType } from "react-icons";
import Button from "../buttons/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "query-string";
import useSeachModal from "@/hooks/useSeachModal";


interface CategoryBoxProps {
    className: string
    icon: IconType
    label: string
    id: string
    selected?: boolean
}

// category box
const CategoryBox: React.FC<CategoryBoxProps> = ({
    className, icon: Icon, label, id, selected
}) => {
    // use search modal hook
    const searchModal = useSeachModal()
    // params
    const params = useSearchParams()
    // router
    const router = useRouter()

    // on click handler
    const handleClick = useCallback(() => {
        // obj query
        let currentQuery = {}

        // if there's current params
        // parse the params string into obj
        if(params) currentQuery = qs.parse(params.toString())

        // unpack the values inside currentQuery
        // add the category query into it
        const updatedQuery: any = {
            ...currentQuery,
            category: id
        }

        // if current category is selected, removes it from query
        // add and remove toggle
        if(params?.get('category') === id) delete updatedQuery.category

        // create new url with query
        const url = qs.stringifyUrl({
            url: '/', query: updatedQuery
        }, { skipNull: true })

        // push url
        router.push(url)
        // close modal
        searchModal.onClose()
    }, [id, params, router, searchModal])

    // render elements
    return (
        <Button className={clsx(className,
            selected && "text-gray-600 border-[#737373] border-b-[2px]",
            !selected && "border-none hover:text-gray-500")} onClick={handleClick}>
            <Icon size={28} />
            <div className="font-medium text-sm">
                {label}
            </div>
        </Button>
    );
}
 
export default CategoryBox;
