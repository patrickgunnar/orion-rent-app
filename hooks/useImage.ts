'use client'

import { useSupabaseClient } from "@supabase/auth-helpers-react"


const useImage = (imagePath: string | null | undefined) => {
    // get supabase client 
    const supabaseClient = useSupabaseClient()

    // if image path null, return
    if(!imagePath) return null

    return supabaseClient.storage.from('profile').getPublicUrl(imagePath).data.publicUrl
}

export default useImage