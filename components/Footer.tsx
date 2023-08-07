'use client'

import useAboutModal from "@/hooks/useAboutModal";
import Button from "./buttons/Button";


// footer
const Footer = () => {
    // aboutModal
    const aboutModal = useAboutModal()

    // render elements
    return (
        <div className="fixed bottom-0 z-30 h-fit w-full">
            <footer className="flex flex-row mx-auto rounded-t-lg justify-center items-center drop-shadow-[0_0_0.5rem] 
                shadow-[#00000080] from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b w-[99.5%] h-[50px]">
                <div className="flex justify-between items-center h-full w-[95%] md:w-[20%]">
                    <div>
                        © <a href="https://www.linkedin.com/in/patrickgunnar/">
                            Patrick Gunnar
                        </a> - All Rights Reserved
                    </div>
                    <Button className="flex justify-center items-center py-1 px-2 h-fit w-fit shadow-[0_0_0.2rem] 
                    shadow-[#00000080] border-[#737373] border-[1px] rounded-lg from-[#751a0780] via-[#9f280980] 
                    to-[#c71e0280] bg-gradient-to-t hover:from-[#751a0780] hover:to-[#751a0780] font-bold text-normal"
                    onClick={aboutModal.onOpen}>
                        About
                    </Button>
                </div>
            </footer>
        </div>
    );
}
 
export default Footer;
