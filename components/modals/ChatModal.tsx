'use client'

import useChatStep from "@/hooks/useChatStep"
import Modal from "./Modal"
import useChatModal from "@/hooks/useChatModal"
import { useUser } from "@/hooks/useUser"
import { useCallback, useEffect, useState } from "react"
import { MessageType } from "@/types"
import ChatBox from "../chats/ChatBox"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { IoChevronBack } from "react-icons/io5"
import Conversation from "../chats/Conversation"


enum STEPS {
    ALLCHATS = 0,
    CHATBOX = 1,
}

// chat modal
const ChatModal = () => {
    // use chat modal
    const chatModal = useChatModal()
    // get supabase client 
    const supabaseClient = useSupabaseClient()
    // ste hook
    const { step, host_details, setStep } = useChatStep()
    // get current user
    const user = useUser()
    // get chats
    const [chats, setChats] = useState<MessageType[][] | null>(null)
    // reload msg fetch
    const [dummyReloadMsg, setDummyReloadMsg] = useState<boolean>(true)

    const filterMessages = useCallback((currentChats: MessageType[], user_id: string) => {
        // chats result
        const results: MessageType[][] = []
        // used ids
        let currentIds: string[] = []

        // loop through datas ids
        for(let item of currentChats) {
            // current 2cnd id
            const current_id = user_id === item.user_id ? item.host_id : item.user_id

            // if current id is not included into current used ids
            if(!currentIds.includes(current_id)) {
                // current group
                const currentGroup = currentChats.filter(el => {
                    // get current valid id to check
                    const currentElId = el.user_id === user_id ? el.host_id : el.user_id

                    return current_id === currentElId
                })
                // push id inside current used ids
                currentIds.push(current_id)
                // push current data into results
                results.push(currentGroup)
            }
        }

        return results
    }, [])

    useEffect(() => {
        // get user chats handler
        const gettingUserConversations = async () => {
            // if not user id, return
            if(!user.userDetails) return

            const { data: userChats, error: chatsError} = await supabaseClient.from('messages').select('*').or(
                `user_id.eq.${user.userDetails.id},host_id.eq.${user.userDetails.id}`
            ).order('created_at', { ascending: false })

            // if any error
            if(chatsError) return

            const results = filterMessages(userChats, user.userDetails.id)

            // if not result
            if(!results) return

            // set user's chats
            setChats(results)
            // set dummy to false
            setDummyReloadMsg(false)
        }

        if(dummyReloadMsg) gettingUserConversations()
    }, [user.userDetails?.id, chats, dummyReloadMsg, filterMessages, supabaseClient, user.userDetails])

    // use effect to handler the realtime messages
    useEffect(() => {
        // set an supabase subscription
        const supaSubscription = supabaseClient.channel('schema-db-changes').on(
            'postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'messages'
            }, (_) => {
                setDummyReloadMsg(true)
            }
        ).subscribe()

        return () => {
            supabaseClient.removeChannel(supaSubscription)
        }
    }, [supabaseClient])

    // on change modal handler
    const onChangeHandler = (isOpen: boolean) => {
        // if modal is opened
        if(isOpen) {
            // close it
            chatModal.onClose()
            // reset step
            setStep(0)
        }
    }

    // filter the chat messages
    const filterChatMessages = () => {
        if(chats && host_details && user.userDetails) {
            return chats.filter(item  => {
                // get current id to check
                const currentItemId = item[0].user_id === user.userDetails?.id ? item[0].host_id : item[0].user_id

                return host_details.id === currentItemId
            })[0]
        }

        return []
    }

    // current layout
    let currentLayout = (
        <div className="flex flex-col gap-2 justify-center items-center p-4 h-fit w-full">
            {
                (chats && chats.length > 0) ? (
                    chats.map((item, index) => (
                        <ChatBox key={index} chat={item} />
                    ))
                ) : (
                    <div className="text-ellipsis text-center text-[#737373] h-fit w-full">
                        No conversations. Select a property, then click on the chat button! 
                    </div>
                )
            }
        </div>
    )

    // if current step is chatbox
    if(step === STEPS.CHATBOX) currentLayout = (
        <div className="flex flex-col gap-2 justify-between items-center p-4 h-full w-full">
            <div className="flex justify-start items-center h-fit w-full">
                <div className="flex justify-center items-center cursor-pointer gap-1 h-fit w-fit
                text-gray-700 font-semibold hover:opacity-75" onClick={() => setStep(0)}>
                    <IoChevronBack size={20} />
                    Back
                </div>
            </div>
            <Conversation currentChat={filterChatMessages()} />
        </div>
    )

    // render elements
    return (
        <Modal
            title="Messages"
            description="Get in touch with the advertiser."
            isOpen={chatModal.isOpen}
            onChange={() => onChangeHandler(chatModal.isOpen)}>
            {
                currentLayout
            }
        </Modal>
    );
}
 
export default ChatModal;
