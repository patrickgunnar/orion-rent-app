'use client'

import { RegionType } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"


const useRegion = () => {
    // current list of regions
    const [currentRegions, setCurrentRegions] = useState<RegionType[]>([])

    // handle the regions fecth
    useEffect(() => {
        // fetch regions handler
        const currentRegionsHandler = async () => {
            // fecth regions objects array
            // set the array to current regions state
            setCurrentRegions(
                [...(await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')).data].sort(
                    (a: RegionType, b: RegionType) => a.nome.localeCompare(b.nome)
                )
            )
        }

        currentRegionsHandler()
    }, [])

    // return values
    return {
        currentRegions
    }
}

export default useRegion
