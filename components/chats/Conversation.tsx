'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import useChatStep from "@/hooks/useChatStep";
import { RiSendPlaneFill } from "react-icons/ri";
import Button from "../buttons/Button";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import { MessageType } from "@/types";
import MessageWrapper from "./MessageWrapper";
import useImage from "@/hooks/useImage";
import { useUser } from "@/hooks/useUser";


interface ConversationProps {
    currentChat: MessageType[]
}

// conversation leyout
const Conversation: React.FC<ConversationProps> = ({
    currentChat
}) => {
    // get current user
    const user = useUser()
    // ste hook
    const { host_details } = useChatStep()
    // get router hook
    const router = useRouter()
    // get supabase client 
    const supabaseClient = useSupabaseClient()

    // use state to deal with current loading
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // container's ref
    const currentContainerRef = useRef<HTMLDivElement>(null)

    // use form hook
    const {
        register, handleSubmit, reset, formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            currentMessage: ''
        }
    })

    // submit handler
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            if(data.currentMessage && host_details && host_details.id) {
                // create record on db
                const {
                    error: supaError
                } = await supabaseClient.rpc('insert_public_message', {
                    hostid: host_details.id,
                    current_msg: data.currentMessage
                })

                // if record insertion error
                if(supaError) {
                    // set is loading to false
                    setIsLoading(false)

                    return toast.error('Message send failure, try again!')
                }

                // refresh router
                router.refresh()
                // toast success msg
                toast.success('Message sent!')
                // reset inputs
                reset()
                // set is loading to false
                setIsLoading(false)
            }
        } catch (error) {
            // set is loading to false
            setIsLoading(false)
            // display error msg
            toast.error('Message send failure, try again!')
        }
    }

    // updates last seen
    const handleLastSeen = useCallback(async (msg_id: string) => {
        await supabaseClient.rpc('update_last_seen_message', {
            msg_id: msg_id
        })
    }, [supabaseClient])

    // intersection handler
    const handleElementIntersection: IntersectionObserverCallback = useCallback((entries) => {
        // loop through entries
        entries.forEach((entry) => {
            // if the current entry is intersecting
            if(entry.isIntersecting && entry.target.getAttribute('data-readed') === 'false') {
                // updates the seen column on the db
                handleLastSeen(entry.target.id)
            }
        })
    }, [handleLastSeen])

    useEffect(() => {
        if(currentContainerRef.current) {
            // get elements parent
            const elementFather = currentContainerRef.current
            // get father's children
            const childrenElements = Array.from(elementFather.children)

            // if not children, return
            if(!childrenElements) return

            // observer opt
            const observerOpt: IntersectionObserverInit = {
                root: elementFather,
                threshold: 0.5
            }

            // observer
            const observer = new IntersectionObserver(handleElementIntersection, observerOpt)

            // observe each children
            childrenElements.forEach(item => {
                if(item.getAttribute('data-readed') === 'false') {
                    observer.observe(item)
                }
            })

            // clean up the observer on unmount
            return () => {
                observer.disconnect()
            }
        }
    }, [currentChat, handleElementIntersection])

    // host img
    const hostImg = useImage(host_details?.avatar_url)
    // user img
    const userImg = useImage(user.userDetails?.avatar_url)

    return (
        <div className="flex flex-col justify-between items-center h-[95%] w-full">
            <div className="flex flex-col-reverse justify-start items-start h-[80%] w-full 
            overflow-hidden overflow-y-auto no-scrollbar" ref={currentContainerRef}>
                {
                    currentChat ? (
                        currentChat.map(item => (
                            <MessageWrapper key={item.id} 
                                message={item}
                                hostImg={hostImg}
                                userImg={userImg}
                                hostId={host_details?.id}
                                userId={user.userDetails?.id}
                                hostName={host_details?.full_name}
                                userName={user.userDetails?.full_name}
                            />
                        ))
                    ) : (
                        <div className="text-ellipsis text-center text-[#737373] h-fit w-full">
                            Type a message
                        </div>
                    )
                }
            </div>
            <div className="flex justify-between items-center h-[20%] w-full md:w-[90%]">
                <div className="flex justify-center items-center p-2 h-full w-[75%] md:w-[85%]">
                    <Input id="currentMessage"
                        isLabel={false}
                        isTextBox
                        isMessages
                        label=""
                        placeholder={`Enviar mensagem para ${host_details?.full_name}`}
                        maxLength={2000}
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                        type="text"
                        required
                    />
                </div>
                <div className="flex justify-end items-center h-full w-[10%] md:w-[15%]">
                    <Button className="flex justify-center items-center rounded-lg text-white from-[#9f2809] 
                    to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] shadow-[#00000080] 
                    border-[#737373] border-[1px] hover:from-[#c71e02] hover:to-[#c71e02] 
                    h-[65%] aspect-square" type="submit" onClick={handleSubmit(onSubmit)}>
                        <RiSendPlaneFill size={30} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
 
export default Conversation;
