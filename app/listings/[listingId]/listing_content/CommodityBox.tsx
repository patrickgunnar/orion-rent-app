'use client'

import { VscDebugBreakpointLog } from "react-icons/vsc"


interface CommodityBoxProps {
    commodity: string
}

// commodity box
const CommodityBox: React.FC<CommodityBoxProps> = ({
    commodity
}) => {
    // render content
    return (
        <div className="flex justify-start items-center drop-shadow-[0_0_0.1rem] shadow-[#00000080] 
        from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b rounded-lg h-full w-full">
            <div className="flex justify-center items-center text-sm uppercase font-bold gap-2 p-4 h-fit w-fit">
                <VscDebugBreakpointLog size={20} />
                {commodity}
            </div>
        </div>
    );
}
 
export default CommodityBox;
