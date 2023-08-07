'use client'

import clsx from "clsx"
import DialogChildren from "../dialog_content/DialogChildren"
import DialogDescription from "../dialog_content/DialogDescription"
import DialogEvent from "../dialog_content/DialogEvent"
import DialogFooter from "../dialog_content/DialogFooter"
import DialogHeader from "../dialog_content/DialogHeader"
import DialogStore from "../dialog_content/DialogStore"
import DialogTitle from "../dialog_content/DialogTitle"
import { CgClose } from "react-icons/cg";


interface ModalProps {
    children?: React.ReactNode
    title: string
    description: string
    isOpen: boolean
    onChange: () => void
    footer?: React.ReactNode
}

// modal component
const Modal: React.FC<ModalProps> = ({
    children, title, description, isOpen, onChange, footer
}) => {
    // render elements
    return (
        <DialogStore className="flex flex-col justify-start items-center rounded-lg drop-shadow-[0_0_0.5rem]
            shadow-[#00000080] from-[#E1DCDC] via-[#F0EBEB] to-[#FFFAFA] bg-gradient-to-b overflow-hidden 
            transition-transform duration-1000 p-6 h-[90%] w-[95%] lg:w-[50%] z-50" isOpen={isOpen} onChange={onChange}>
            <DialogHeader className="flex flex-col justify-start h-fit w-full">
                <DialogEvent className="flex justify-center items-center aspect-square w-fit
                    ml-auto mr-0" onClick={onChange}>
                    <CgClose size={25} />
                </DialogEvent>
                <DialogTitle clasName="flex justify-center items-center border-[#737373] border-b-[1px] pb-4
                    font-semibold text-base text-black h-fit w-full">
                    {title}
                </DialogTitle>
                <DialogDescription className="flex justify-start items-center py-4 text-lg font-bold
                    text-black h-fit w-full">
                    {description}
                </DialogDescription>
            </DialogHeader>
            <DialogChildren className={clsx("flex justify-center items-start overflow-hidden overflow-y-auto w-full transition",
                footer ? 'h-max' : 'h-full')}>
                {children}
            </DialogChildren>
            {
                footer && (
                    <DialogFooter className="flex justify-center items-center h-fit w-full">
                        {footer}
                    </DialogFooter>
                )
            }
        </DialogStore>
    );
}
 
export default Modal;
