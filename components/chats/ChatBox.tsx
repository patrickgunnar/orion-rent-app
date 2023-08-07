'use client'

import useImage from "@/hooks/useImage";
import { MessageType } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import Button from "../buttons/Button";
import useChatStep from "@/hooks/useChatStep";
import { useUser } from "@/hooks/useUser";
import clsx from "clsx";


interface ChatBoxProps {
    chat: MessageType[]
}

interface HostStore {
    full_name: string
    avatar_url: string
}

// chat box
const ChatBox: React.FC<ChatBoxProps> = ({
    chat
}) => {
    // get current user
    const user = useUser()
    // get supabase client 
    const supabaseClient = useSupabaseClient()
    // ste hook
    const { setStep, setHostDetails } = useChatStep()

    // get the other user's id
    const currentOtherUser = user.userDetails?.id === chat[0].user_id ? chat[0].host_id : chat[0].user_id

    // host details
    const [currentHost, setCurrentHost] = useState<HostStore>({ full_name: 'No Name', avatar_url: '' })

    useEffect(() => {
        // collects host details
        const gettingHostDetails = async () => {
            const { data: hostData, error: dataError} = await supabaseClient.from('users').select(
                'full_name, avatar_url'
            ).eq('id', currentOtherUser).single()

            // if any error
            if(dataError) return

            let currentHostData = { full_name: hostData.full_name, avatar_url: hostData.avatar_url }

            // if not host data
            if(!hostData.avatar_url && !hostData.full_name) currentHostData = { full_name: 'No Name', avatar_url: '' }
            // if not data avatar_url
            if(!hostData.avatar_url && hostData.full_name) currentHostData = { avatar_url: '', full_name: hostData.full_name }
            // if not data full_name
            if(!hostData.full_name && hostData.avatar_url) currentHostData = { full_name: 'No Name', avatar_url: hostData.avatar_url }

            // set host data
            setCurrentHost(currentHostData)
        }

        gettingHostDetails()
    }, [currentOtherUser, supabaseClient])

    // get the host img
    const hostImg = useImage(currentHost.avatar_url)

    // on click handler
    const handleOnClick = () => {
        // set current step
        setStep(1)
        // set host id
        setHostDetails({
            ...currentHost,
            id: currentOtherUser
        })
    }

    // render content
    return (
        <Button className="flex gap-2 items-center justify-start py-1 px-2 rounded-lg drop-shadow-[0_0_0.1rem]
        shadow-[#00000080] from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b h-20 w-[100%] md:w-[90%]
        hover:opacity-75" onClick={handleOnClick}>
            {
                hostImg ? (
                    <div className="relative flex h-[90%] aspect-square rounded-full drop-shadow-[0_0_0.05rem] 
                    shadow-[#00000080] border-[#737373] border-[1px] mx-1 overflow-hidden">
                        <Image className="object-cover"
                            src={hostImg}
                            alt={currentHost.full_name}
                            fill
                        />
                    </div>
                ) : (
                    <div className="relative flex h-[90%] aspect-square mx-1 overflow-hidden">
                        <IoPersonCircleSharp className="h-full w-full" />
                    </div>
                )
            }
            <div className="flex flex-col justify-center items-center text-start h-full w-[50%] md:w-[80%]">
                <div className="relative truncate text-base font-bold text-ellipsis h-fit w-full">
                    {currentHost?.full_name}
                </div>
                <div className={clsx("relative truncate text-ellipsis h-fit w-full",
                user.userDetails?.id !== chat[0].user_id && !chat[0].readed ? (
                    'font-bold text-black'
                ) : (
                    'font-normal text-[#737373]'
                ))}>
                    {chat[0].message}
                </div>
            </div>
        </Button>
    );
}
 
export default ChatBox;
