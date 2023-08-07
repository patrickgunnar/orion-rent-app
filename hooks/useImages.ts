'use client'

import { useSupabaseClient } from "@supabase/auth-helpers-react";


// get public image url
const useImages = (imagesPath: string[]) => {
    // get supabase client 
    const supabaseClient = useSupabaseClient()

    // get public urls
    return imagesPath.map(item => {
        // get image url
        const { 
            data: imageUrl
        } = supabaseClient.storage.from('images').getPublicUrl(item)

        return imageUrl.publicUrl
    })
}
 
export default useImages;

