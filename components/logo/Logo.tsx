'use client'

import { useRouter } from "next/navigation";
import Button from "../buttons/Button";
import LogoElement from "./LogoElement";
import websitedata from "@/app/websitedata";


// logo content
const Logo = () => {
    // get router
    const router =  useRouter()

    // render elements
    return (
        <div className="flex flex-row justify-center items-center px-[6%] h-full w-fit">
            <Button className="flex flex-row justify-center items-center h-full w-fit" onClick={() => router.push('/')}>
                <div className="relative h-[75%] mt-2 aspect-square">
                    <LogoElement />
                </div>
                <div className="flex items-center text-3xl bg-clip-text text-transparent font-extrabold font-title-logo
                    from-[#fb2056] to-[#870223] bg-gradient-to-br h-full w-fit">
                    {websitedata.title}
                </div>
            </Button>
        </div>
    );
}
 
export default Logo;
