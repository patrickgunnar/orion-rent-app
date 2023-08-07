'use client'

import { PropertyType } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";


// get public image url
const useCoverImage = (properties: PropertyType[]) => {
    // get supabase client 
    const supabaseClient = useSupabaseClient()

    // images array
    return properties.map(item => {
        // get image url
        const { 
            data: imageCover
        } = supabaseClient.storage.from('images').getPublicUrl(item.cover_image)

        return {
            ...item,
            cover_image: imageCover.publicUrl
        }
    }) as PropertyType[]
}
 
export default useCoverImage;
