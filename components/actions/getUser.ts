'use server'

import { CommentType } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"


const getUser = async (comments: CommentType[]) => {
    // supabase server component client
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    // data with user var
    const dataWithUser = []

    for(let item of comments) {
        // fetch user
        const { data } = await supabase.from('users').select(
            'full_name, avatar_url'
        ).eq('id', item.user_id).single()

        // create user data
        const user = data ? { 
            name: data.full_name,
            image: data.avatar_url
        } : {
            name: 'No Name',
            image: ''
        }

        // push comment with user
        dataWithUser.push({
            ...item,
            user: user
        })
    }

    return dataWithUser
}

export default getUser
