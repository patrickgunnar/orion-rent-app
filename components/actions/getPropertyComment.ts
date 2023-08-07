'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"


const getPropertyComment = async (property_id: string) => {
    // supabase server component client
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    // fetch comments
    const { data, error } = await supabase.from('comments').select('*').eq(
        'property_id', property_id
    ).order('created_at', { ascending: false })

    // if any error
    if(error) return null

    return data
}

export default getPropertyComment
