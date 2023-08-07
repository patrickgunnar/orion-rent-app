'use client'

import { TfiAlignJustify, TfiClose } from "react-icons/tfi";
import { useState } from "react";
import Button from "../buttons/Button";
import Logo from "../logo/Logo";
import AccountContent from "./AccountContent";
import SearchContent from "./SearchContent";


interface NavbarMobileProps {
    className: string
}

// navbar mobile version
const NavbarMobile: React.FC<NavbarMobileProps> = ({
    className
}) => {
    // use state to show the dropdown menu
    const [isOpen, setIsOpen] = useState(false)

    // render elements
    return (
        <div className={className}>
            <div className="flex items-center justify-between drop-shadow-[0_0_0.5rem] 
                rounded-b-lg shadow-[#1e1e1e80] from-[#f8f9eb] to-[#e0e1d9] 
                bg-gradient-to-b h-[60px] w-full overflow-hidden">
                <Logo />
                <Button className="flex items-center justify-center px-[6%] h-[100%] w-fit" onClick={() => setIsOpen(!isOpen)}>
                    {
                        !isOpen ? (
                            <TfiAlignJustify className="text-[#383838]" size={23} />
                        ) : (
                            <TfiClose className="text-[#383838]" size={23} />
                        )
                    }
                </Button>
            </div>
            {
                isOpen && (
                    <div className="absolute top-0 h-screen w-full -z-10">
                        <div className="absolute bg-[#38383880] h-full w-full" onClick={() => setIsOpen(false)} />
                        <div className="flex flex-col drop-shadow-[0_0_0.2rem] rounded-lg shadow-[#1e1e1e80]
                            from-[#f8f9eb] to-[#e0e1d9] bg-gradient-to-b my-[76px] py-4 h-fit w-full">
                                <div className="h-fit w-full">
                                    <AccountContent />
                                </div>
                                <div className="h-fit w-full">
                                    <SearchContent />
                                </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
 
export default NavbarMobile;
