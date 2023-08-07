'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"


const getHostProperties = async (userId: string | null | undefined) => {
    try {
        // supabase server component client
        const supabase = createServerComponentClient({
            cookies: cookies
        })

        // if not user id
        if(!userId) return null

        const { data, error } = await supabase.from('properties').select('*').eq(
            'user_id', userId
        ).eq('renewed', false).order('created_at', { ascending: false })

        // if error
        if(error) return null
        // if not data
        if(!data) return null

        return data
    } catch (error: any) {
        throw new Error(error)
    }
}

export default getHostProperties
