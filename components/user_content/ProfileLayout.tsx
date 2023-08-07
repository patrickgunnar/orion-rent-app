'use client'

import Image from "next/image";
import { IoPersonCircleSharp } from "react-icons/io5";


interface ProfileLayoutProps {
    name: string | number
    image: string | null
}

// user profile layout
const ProfileLayout: React.FC<ProfileLayoutProps> = ({
    name, image
}) => {
    // render content
    return (
        <div className="flex flex-row justify-start items-center h-full w-full">
            {
                image ? (
                    <div className="relative flex h-[85%] aspect-square rounded-full drop-shadow-[0_0_0.05rem] 
                    shadow-[#00000080] border-[#737373] border-[1px] mx-1 overflow-hidden">
                        <Image className="object-cover"
                            src={image}
                            alt={name.toString()}
                            fill
                        />
                    </div>
                ) : (
                    <div className="relative flex h-[85%] aspect-square mx-1 overflow-hidden">
                        <IoPersonCircleSharp className="h-full w-full" />
                    </div>
                )
            }
            <div className="relative text-left text-sm font-normal p-1 my-auto truncate h-fit w-[75%]">
                {name}
            </div>
        </div>
    );
}
 
export default ProfileLayout;
