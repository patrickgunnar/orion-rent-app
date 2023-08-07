'use client'

import useSettingsModal from "@/hooks/useSettingsModal";
import Button from "../buttons/Button";
import ProfileLayout from "./ProfileLayout";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import useChatModal from "@/hooks/useChatModal";
import useAddModal from "@/hooks/useAddModal";


interface UserSessionProps {
    image: string | null
    name: string | number
}

// user on session layout
const UserSession: React.FC<UserSessionProps> = ({
    image, name
}) => {
    // use settings modal hook
    const settingsModal = useSettingsModal()
    // use chat modal hook
    const chatModal = useChatModal()
    // use add modal hook
    const addModal = useAddModal()

    // render content
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center h-fit w-[90%] lg:w-[80%]">
            <div className="flex justify-between items-center h-[60px] w-full lg:w-[61%]">
                <Button className="flex h-[70%] w-[80%] hover:opacity-60" onClick={settingsModal.onOpen}>
                    <ProfileLayout name={name} image={image} />
                </Button>
                <Button className="h-[30%] aspect-square hover:opacity-60" onClick={chatModal.onOpen}>
                    <IoChatbubbleEllipsesSharp className="h-full w-full" />
                </Button>
            </div>
            <div className="flex justify-center items-center h-[60px] w-full lg:w-[30%]">
                <Button className="flex flex-row justify-center items-center rounded-lg border-[1px] 
                shadow-[0_0.05rem_0.1rem] shadow-[#00000080] font-normal text-xs md:text-sm text-[#6c6c6c]
                from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b border-[#737373] px-4
                h-[70%] w-full hover:shadow-[0_0.05rem_0.4rem] overflow-hidden" onClick={addModal.onOpen}>
                    Advertise
                </Button>
            </div>
        </div>
    );
}
 
export default UserSession;
