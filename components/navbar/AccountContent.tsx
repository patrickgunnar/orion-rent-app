'use client'

import AccountSession from "./AccountSession";
import UserSession from "../user_content/UserSession";
import { useSessionContext } from "@supabase/auth-helpers-react";
import useImage from "@/hooks/useImage";
import { useUser } from "@/hooks/useUser";


// account elements
const AccountContent = () => {
    // get session from context
    const { session } = useSessionContext()
    // get current user 
    const user = useUser()
    // get user image
    const image = useImage(user.userDetails?.avatar_url)
    // get user name
    const name = user.userDetails?.full_name || user.user?.email || user.userDetails?.phone || 'Full Name'

    // render content
    return (
        !session ? (
            <div className="flex flex-row justify-center items-center overflow-hidden h-16 w-full">
                <AccountSession />
            </div>
        ) : (
            <div className="flex flex-row justify-center items-center overflow-hidden h-fit w-full">
                <UserSession
                    name={name}
                    image={image}
                />
            </div>
        )
    );
}
 
export default AccountContent;
