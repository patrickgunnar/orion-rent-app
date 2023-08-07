'use client'

import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";


// navbar content
const Navbar = () => {
    // render elements
    return (
        <div className="fixed top-0 z-50 w-full h-fit">
            <NavbarDesktop className="hidden lg:flex rounded-b-lg justify-between mx-auto drop-shadow-[0_0_0.5rem] 
                shadow-[#00000080] from-[#E1DCDC] via-[#F0EBEB] to-[#FFFAFA] bg-gradient-to-b w-[99.5%] h-[60px]"
            />
            <NavbarMobile className="relative lg:hidden mx-auto w-[99.5%] h-fit"
            />
        </div>
    );
}
 
export default Navbar;
