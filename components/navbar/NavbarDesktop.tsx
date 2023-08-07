'use client'

import Logo from "../logo/Logo";
import AccountContent from "./AccountContent";
import SearchContent from "./SearchContent";


interface NavbarDesktopProps {
    className: string
}

// navbar desktop version
const NavbarDesktop: React.FC<NavbarDesktopProps> = ({
    className
}) => {
    // render elements
    return (
        <div className={className}>
            <div className="relative h-full w-[30%]">
                <SearchContent />
            </div>
            <Logo />
            <div className="relative h-full w-[30%]">
                <AccountContent />
            </div>
        </div>
    );
}
 
export default NavbarDesktop;
