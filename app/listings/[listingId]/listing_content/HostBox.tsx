'use client'

import Button from "@/components/buttons/Button"
import useAccountModal from "@/hooks/useAccountModal"
import useChatModal from "@/hooks/useChatModal"
import useChatStep from "@/hooks/useChatStep"
import useHostAddModal from "@/hooks/useHostAddModal"
import useImage from "@/hooks/useImage"
import { useUser } from "@/hooks/useUser"
import { CommentType } from "@/types"
import { useSessionContext } from "@supabase/auth-helpers-react"
import clsx from "clsx"
import Image from "next/image"
import { useState } from "react"
import { IoPersonSharp } from "react-icons/io5"


interface HostBoxProps {
    host: { full_name: string, avatar_url: string }
    phone: string
    hostId: string
    comments: CommentType[]
}

// host box
const HostBox: React.FC<HostBoxProps> = ({
    host, phone, hostId, comments
}) => {
    // get current user
    const user = useUser()
    // get session from context
    const { session } = useSessionContext()
    // use account modal
    const accountModal = useAccountModal()
    // use chat modal
    const chatModal = useChatModal()
    // use host add modal
    const hostAddModal = useHostAddModal()
    // ste hook
    const { setHostDetails, setStep } = useChatStep()

    // get host image
    const image = useImage(host.avatar_url)

    // show phone state
    const [showPhone, setShowPhone] = useState<boolean>(false)

    // display phone handler
    const handlePhone = () => {
        // if there's session
        // show phone number
        // else
        // open login/register modal
        if(session) setShowPhone(true)
        else accountModal.onOpen()
    }

    // host add modal open handler
    const handleHostAddModal = () => {
        // set comments
        hostAddModal.setComments(comments)
        // set current host id
        hostAddModal.setUserId(hostId)
        // open modal
        hostAddModal.onOpen()
    }

    // chat to current host handler
    const handleCurrentHostChat = () => {
        if(session) {
            // set chat step
            setStep(1)
            // set current host details
            setHostDetails({
                full_name: host.full_name,
                avatar_url: host.avatar_url,
                id: hostId
            })
            // open chat modal
            chatModal.onOpen()
        } else accountModal.onOpen()
    }

    // render elements
    return (
        <div className="flex flex-col justify-start items-center drop-shadow-[0_0_0.1rem] shadow-[#00000080] 
        from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b rounded-lg py-8 px-4 h-fit w-full">
            <div className="flex flex-col justify-between items-center gap-[2%] h-fit w-full">
                {
                    image ? (
                        <div className="relative flex w-[40%] aspect-square rounded-full drop-shadow-[0_0_0.1rem] 
                        shadow-[#00000080] border-[#737373] border-[1px] mb-2 overflow-hidden">
                            <Image className="object-cover"
                                src={image}
                                alt={host.full_name}
                                fill
                            />
                        </div>
                    ) : (
                        <div className="relative flex w-[40%] aspect-square mb-2 overflow-hidden">
                            <IoPersonSharp className="h-full w-full" />
                        </div>
                    )
                }
                <div className="flex justify-center items-center text-base font-medium p-1 h-fit w-full">
                    {host.full_name}
                </div>
            </div>
            <div className="flex flex-col justify-start items-center my-4 h-fit w-full">
                <div className="flex justify-start items-center text-sm font-medium px-4 h-fit w-full">
                    Phone:
                </div>
                {
                    !showPhone ? (
                        <div className="flex justify-center items-center h-fit w-full">
                            <Button className="flex justify-center items-center text-xs font-medium text-black
                            my-2 h-full w-fit border-b-[2px] border-transparent hover:border-[#737373]"
                                onClick={handlePhone}>
                                Show number
                            </Button>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center text-base md:text-lg py-2 font-bold px-4 h-fit w-full">
                            {phone}
                        </div>
                    )
                }
            </div>
            <Button className={clsx(`flex justify-center items-center text-sm font-medium rounded-lg text-white
                shadow-[0_0_0.2rem] shadow-[#00000080] border-[#737373] border-[1px] my-2 md:my-8 h-11 w-[50%]
                bg-gradient-to-t`,
                user.userDetails?.id === hostId ? (
                    'from-[#676666] via-[#8e8e8e] to-[#d5d4d4]'
                ) : (
                    'from-[#9f2809] to-[#c71e02] hover:from-[#c71e02] hover:to-[#c71e02]'
                ))}
                onClick={handleCurrentHostChat} disabled={user.userDetails?.id === hostId}>
                Chat
            </Button>
            <div className="flex justify-center items-center h-fit w-full">
                <Button className="flex justify-center items-center text-sm font-medium text-black
                my-2 h-full w-fit border-b-[2px] border-transparent hover:border-[#737373]"
                    onClick={handleHostAddModal}>
                    All Advertisements
                </Button>
            </div>
        </div>
    );
}
 
export default HostBox;
