'use client'

import { useState } from "react";
import { categories } from "../navbar/Categories";
import { CategoryType } from "@/types";
import CategorySelectBox from "./CategorySelectBox";

interface CategorySelectProps {
    className: string
    value: CategoryType
    onClick: (value: CategoryType | {}) => void
}

// category select
const CategorySelect: React.FC<CategorySelectProps> = ({
    className, value, onClick
}) => {
    // render elements
    return (
        <div className={`[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ${className}`}>
            {
                categories.map(item => (
                    <CategorySelectBox className="flex flex-col justify-center items-center transition gap-1 p-1 h-full"
                        key={item.label}
                        category={item}
                        id={item.id}
                        label={item.label}
                        icon={item.icon}
                        selected={value?.id === item.id}
                        value={value}
                        onClick={onClick}
                    />
                ))
            }
        </div>
    );
}
 
export default CategorySelect;
