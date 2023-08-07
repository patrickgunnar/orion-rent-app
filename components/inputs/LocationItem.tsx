'use client'

import { RegionType } from "@/types";
import { BsCheckLg } from "react-icons/bs";
import Button from "../buttons/Button";
import { useCallback } from "react";


interface LocationItemProps {
    region: RegionType
    isSelected: boolean
    onChange: (value: RegionType | null) => void
}

// location item
const LocationItem: React.FC<LocationItemProps> = ({
    region, isSelected, onChange
}) => {
    // on change handler
    const handleChange = useCallback((value: RegionType) => {
        // removes region if its setted
        if(isSelected) return onChange(null)

        // set region
        return onChange(value)
    }, [isSelected, onChange])

    // render content
    return (
        <Button className="flex justify-between items-center my-[2px] p-2 h-8 w-full shadow-[0_0_0.1rem] 
            shadow-[#00000080] border-[#737373] border-[1px] rounded-lg overflow-hidden 
            from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b"
            onClick={() => handleChange(region)}>
            <div className="relative truncate text-sm text-left font-normal h-fit w-[90%]">
                {region.nome}, {region.microrregiao.mesorregiao.UF.nome}
            </div>
            {
                isSelected && (
                    <div className="flex justify-center items-center aspect-square h-full">
                        <BsCheckLg size={20} />
                    </div>
                )
            }
        </Button>
    );
}
 
export default LocationItem;
