'use client'

import { MessageType } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import { IoPersonCircleSharp } from "react-icons/io5";
import { BsCheck, BsCheckAll } from "react-icons/bs";


interface MessageWrapperProps {
    message: MessageType
    hostImg: string | null
    userImg: string | null
    hostId: string | undefined
    userId: string | undefined
    hostName: string | undefined
    userName: string | null | undefined
}

// msg wrapper
const MessageWrapper: React.FC<MessageWrapperProps> = ({
    message, hostName, hostImg, hostId, userName, userImg, userId
}) => {
    // current img to display
    const currentImg = message.user_id === userId ? userImg : hostImg
    // current name to display
    const currentName = message.user_id === userId ? userName : hostName
    // const current msg date
    const currentDate = new Date(message.created_at ?? '')

    return (
        <div className={clsx(`flex justify-center items-center drop-shadow-[0_0_0.1rem] rounded-lg gap-3 
        m-4 py-2 px-4 shadow-[#00000080] from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] 
        bg-gradient-to-b flex-wrap md:flex-nowrap h-fit w-fit max-w-[90%] md:max-w-[80%]`, 
        message.user_id === userId ? 'md:self-end' : 'md:self-start')}
        id={message.id} data-readed={message.readed}>
            {
                currentImg && currentName ? (
                    <div className="relative flex h-16 aspect-square rounded-full drop-shadow-[0_0_0.05rem] 
                    shadow-[#00000080] border-[#737373] border-[1px] mx-1 overflow-hidden">
                        <Image className="object-cover"
                            src={currentImg}
                            alt={currentName}
                            fill
                        />
                    </div>
                ) : (
                    <div className="relative flex h-16 aspect-square mx-1 overflow-hidden">
                        <IoPersonCircleSharp className="h-full w-full" />
                    </div>
                )
            }
            <div className="flex flex-col flex-wrap md:flex-nowrap h-fit w-full md:w-fit">
                <div className="relative break-words h-fit w-full overflow-x-hidden">
                    {message.message}
                </div>
                <div className="flex justify-between items-center h-fit w-full">
                    <div className="relative truncate text-sm text-[#737373] h-fit w-[80%]">
                        {`${currentDate.toLocaleDateString()} - ${currentDate.toLocaleTimeString()}`}
                    </div>
                    <div className="flex justify-center items-center p-2 mx-4 h-fit w-fit">
                        {
                            message.readed ? (
                                <BsCheckAll size={15} />
                            ) : (
                                <BsCheck size={15} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default MessageWrapper;
