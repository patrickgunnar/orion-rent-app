'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


const getHost = async (hostId: string) => {
    try {
        // supabase server component client
        const supabase = createServerComponentClient({
            cookies: cookies
        })

        // get host 
        const { data, error } = await supabase.from('users').select(
            'full_name, avatar_url'
        ).eq('id', hostId).single()

        // if any error
        if(error) return null

        // if not host data
        if(!data.avatar_url && !data.full_name) return { full_name: 'No Name', avatar_url: '' }
        // if not data avatar_url
        if(!data.avatar_url && data.full_name) return { avatar_url: '', full_name: data.full_name }
        // if not data full_name
        if(!data.full_name && data.avatar_url) return { full_name: 'No Name', avatar_url: data.avatar_url }

        return data
    } catch (error: any) {
        throw new Error(error)
    }
}

export default getHost
