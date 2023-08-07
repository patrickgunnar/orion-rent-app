'use client'

import useRegion from "@/hooks/useRegion";
import { RegionType } from "@/types";
import { useCallback, useRef, useState } from "react";
import { TbMapPin } from "react-icons/tb";
import LocationItem from "./LocationItem";


interface LocationSelectOnAddCreationProps {
    value: RegionType
    placeholder: string
    onClick: (value: RegionType | null) => void
}

// location select on add creation
const LocationSelectOnAddCreation: React.FC<LocationSelectOnAddCreationProps> = ({
    value, placeholder, onClick
}) => {
    // get current regions hook
    const { currentRegions } = useRegion()

    // input ref
    const inputRef = useRef<HTMLInputElement>(null)

    // search content state
    const [search, setSearch] = useState<string | null>(null)

    // search handler 
    const handleSearch = useCallback(() => {
        // if input ref
        if(inputRef.current) {
            // current input value
            const value = inputRef.current.value

            // set search state
            setSearch(value.toLowerCase())
        }
    } , [])

    // convert diacritics to normal chars
    const convertDiacritics = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    // render components
    return (
        <div className="flex flex-col justify-start items-center p-1 h-max w-full">
            <div className="relative flex justify-start items-center text-base rounded-lg my-4 h-8 w-[95%]
                shadow-[0_0_0.2rem] shadow-[#00000080] border-[#737373] border-[1px] overflow-hidden">
                <input className="bg-gray-200 text-sm font-normal rounded-lg pl-2 pr-9 h-full w-full"
                    placeholder={placeholder} ref={inputRef} onChange={handleSearch}
                />
                <div className="absolute flex justify-center items-center text-gray-500 top-0 bottom-0 
                    right-2 h-full aspect-square">
                    <TbMapPin size={20} />
                </div>
            </div>
            <div className="flex flex-col justify-start items-start p-1 h-fit w-full">
                {
                    currentRegions.length > 0 ? (
                        currentRegions.map((item, index) => (
                            search === null || convertDiacritics(item.nome.toLowerCase()).includes(convertDiacritics(search)) ? (
                                <LocationItem key={`${index} - ${item.id}`} 
                                    region={item} 
                                    isSelected={value?.id === item.id}
                                    onChange={onClick}
                                />
                            ) : (
                                <></>
                            )
                        ))
                    ) : (
                        <div className="flex justify-center items-center text-sm text-gray-500 font-medium h-fit w-full
                        animate-pulse">
                            Loading locations...
                        </div>
                    )
                }
            </div>
        </div>
    );
}
 
export default LocationSelectOnAddCreation;
