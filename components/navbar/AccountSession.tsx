'use client'

import useAccountModal from "@/hooks/useAccountModal";
import Button from "../buttons/Button";


// account login and register button
const AccountSession = () => {
    // use account modal
    const accountModal = useAccountModal()

    // render content
    return (
        <Button className="flex flex-row justify-between items-center rounded-lg border-[1px] 
            shadow-[0_0.05rem_0.1rem] shadow-[#00000080] font-normal text-xs md:text-sm text-[#6c6c6c]
            from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b border-[#737373] 
            h-[70%] w-[90%] xl:w-[80%] hover:shadow-[0_0.05rem_0.4rem] overflow-hidden"
            onClick={accountModal.onOpen}>
            <div className="flex justify-center items-center h-full w-[30%]">Advertise</div>
            <div className="bg-[#737373] h-[80%] w-[1px]" />
            <div className="flex justify-center items-center h-full w-[30%]">Log in</div>
            <div className="bg-[#737373] h-[80%] w-[1px]" />
            <div className="flex justify-center items-center h-full w-[30%]">Register</div>
        </Button>
    );
}
 
export default AccountSession;
