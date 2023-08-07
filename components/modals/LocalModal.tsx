'use client'

import { CgClose } from "react-icons/cg";
import DialogDescription from "../dialog_content/DialogDescription";
import DialogEvent from "../dialog_content/DialogEvent";
import DialogHeader from "../dialog_content/DialogHeader";
import DialogTitle from "../dialog_content/DialogTitle";
import DialogChildren from "../dialog_content/DialogChildren";
import DialogFooter from "../dialog_content/DialogFooter";


interface LocalModalProps {
    children?: React.ReactNode
    title: string
    description: string
    onChange: () => void
    footer?: React.ReactNode
}

// local modal
const LocalModal: React.FC<LocalModalProps> = ({
    children, title, description, onChange, footer
}) => {
    // render content
    return (
        <div className="fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 h-full w-full">
            <div className="absolute bottom-0 top-0 bg-[#38383880] h-full w-full" onClick={onChange} />
            <div className="flex flex-col justify-start items-center rounded-lg drop-shadow-[0_0_0.5rem]
                shadow-[#00000080] from-[#E1DCDC] via-[#F0EBEB] to-[#FFFAFA] bg-gradient-to-b overflow-hidden 
                transition-transform duration-1000 p-6 h-[95%] w-[95%] md:w-[60%]">
                <DialogHeader className="flex flex-col justify-start h-[22%] w-full">
                    <DialogEvent className="flex justify-center items-center aspect-square w-fit
                        ml-auto mr-0" onClick={onChange}>
                        <CgClose size={25} />
                    </DialogEvent>
                    <DialogTitle clasName="flex justify-center items-center border-[#737373] border-b-[1px] pb-4
                        font-semibold text-base text-black h-fit w-full">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="flex justify-start items-center py-4 text-sm font-bold
                        text-black h-fit w-full">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogChildren className="flex flex-col justify-center items-center overflow-hidden overflow-y-auto h-[80%] w-full">
                    {children}
                </DialogChildren>
                {
                    footer && (
                        <DialogFooter className="flex justify-center items-center h-[8%] w-full">
                            {footer}
                        </DialogFooter>
                    )
                }
            </div>
        </div>
    );
}
 
export default LocalModal;
