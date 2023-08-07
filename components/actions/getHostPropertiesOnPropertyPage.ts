'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"


const getHostPropertiesOnPropertyPage = async (userId: string | null | undefined, isPage: boolean) => {
    try {
        // supabase server component client
        const supabase = createServerComponentClient({
            cookies: cookies
        })

        // if not user id
        if(!userId) return null

        // get current date to timestamp
        const toTimestamptz = () => {
            return new Date(Date.now() + (1000 * 60 * (-(new Date()).getTimezoneOffset()))).toISOString().replace('T',' ').replace('Z','')
        }

        const { data, error } = await supabase.from('properties').select('*').eq(
            'user_id', userId
        ).eq('renewed', false).gte('current_period_end', toTimestamptz()).order('created_at', { ascending: false })

        // if error
        if(error) return null
        // if not data
        if(!data) return null

        return data
    } catch (error: any) {
        throw new Error(error)
    }
}

export default getHostPropertiesOnPropertyPage
