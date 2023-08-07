'use server'

import { PropertyType } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { eachDayOfInterval } from "date-fns";


export interface SearchListingsParams {
    guestNumber?: string
    guestRegion?: string
    guestStartDate?: Date | undefined
    guestEndDate?: Date | undefined
    category?: string
    listingId?: string
}

// get all properties
const getAllProperties = async (params: SearchListingsParams): Promise<PropertyType[] | null> => {
    try {
        // queries
        let queries: any = {}

        // get current params
        if(params.listingId) queries.id = params.listingId
        if(params.category) queries.category = params.category
        if(params.guestRegion) queries.locationid = params.guestRegion

        // if guest number on params
        const guestCount = params.guestNumber ? +params.guestNumber : 0

        // if current start and end date
        const guestDateRange = params.guestStartDate && params.guestEndDate ? (
            eachDayOfInterval({
                start: new Date(params.guestStartDate),
                end: new Date(params.guestEndDate)
            })
        ) : undefined

        // supabase server component client
        const supabase = createServerComponentClient({
            cookies: cookies
        })

        // get current date to timestamp
        const toTimestamptz = () => {
            return new Date(Date.now() + (1000 * 60 * (-(new Date()).getTimezoneOffset()))).toISOString().replace('T',' ').replace('Z','')
        }

        // fecth all valid properties
        const { data, error: dataError } = await supabase.from('properties').select('*')
        .gte('current_period_end', toTimestamptz()).match(queries)
        .gte('guestcount', guestCount)
        .order('created_at', { ascending: false })

        // if error
        if(dataError) return null
        // if not data
        if(!data) return null

        // if date range
        if(guestDateRange) return data.filter(item => {
            // loop through reservations
            for(let date of item.reservation) {
                // loop through guest entered dates
                // if current guest date is equal to current reservation date
                // return true
                // else return false
                const includedDate = guestDateRange.map(dt => (
                    new Date(date).toLocaleDateString() === new Date(dt).toLocaleDateString()
                ))

                // if included dates includes true, return false
                if(includedDate.includes(true)) return false
            }

            // if there's no true, return true
            return true
        })

        return data;
    } catch (error: any) {
        throw new Error(error)
    }
}
 
export default getAllProperties;
