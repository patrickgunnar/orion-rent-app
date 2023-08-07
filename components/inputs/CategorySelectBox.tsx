'use client'

import { IconType } from "react-icons"
import Button from "../buttons/Button"
import clsx from "clsx"
import { CategoryType } from "@/types"
import { useCallback } from "react"


interface CategorySelectBoxProps {
    category: CategoryType
    className: string
    icon: IconType
    label: string
    id: string
    selected?: boolean
    value: CategoryType
    onClick: (value: CategoryType | {}) => void
}

// category select box
const CategorySelectBox: React.FC<CategorySelectBoxProps> = ({
    category, className, icon: Icon, label, id, selected,
    value, onClick
}) => {
    // click handler
    const handleClick = useCallback(() => {
        if(value.id === category.id) {
            // reset category
            onClick({})
        } else {
            // set category value
            onClick(category)
        }
    }, [onClick, category, value.id])

    // render content
    return (
        <Button className={clsx(className,
            selected && "text-gray-600 border-[#737373] border-b-[2px]",
            !selected && "border-none hover:text-gray-500")} onClick={handleClick}>
            <Icon size={23} />
            <div className="font-medium text-sm">
                {label}
            </div>
        </Button>
    );
}
 
export default CategorySelectBox;
