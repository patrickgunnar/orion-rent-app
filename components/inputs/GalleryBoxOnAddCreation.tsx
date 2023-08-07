'use client'

import { Gallery, Item } from "react-photoswipe-gallery";
import Image from "next/image";


interface GalleryBoxOnAddCreationProps {
    currentImages: File[]
}

// gallery box
const GalleryBoxOnAddCreation: React.FC<GalleryBoxOnAddCreationProps> = ({
    currentImages
}) => {
    // render content
    return (
        <Gallery>
            <div className=" flex flex-col justify-start items-center mx-auto my-8 p-6 drop-shadow-[0_0_0.2rem] 
            shadow-[#00000080] from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b rounded-lg
            h-96 w-full">
                {
                    currentImages.length > 0 ? (
                        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 
                        gap-2 h-fit w-full overflow-hidden overflow-y-auto">
                            {
                                currentImages.map((item, index) => (
                                    <Item key={index}
                                        thumbnail={item.name}
                                        original={item.name}
                                        height={0}
                                        width={0}>
                                        {
                                            ({ref, open}) => (
                                                <div className="relative flex h-full aspect-square">
                                                    <Image className="object-cover rounded-lg"
                                                        // @ts-ignore
                                                        ref={ref}
                                                        onClick={() => {}} 
                                                        src={URL.createObjectURL(item)} 
                                                        alt={item.name}
                                                        fill
                                                    />
                                                </div>
                                            )
                                        }
                                    </Item>
                                ))
                            }
                        </div>
                    ) : (
                        <div className="flex justify-center items-center text-sm text-gray-500 font-medium h-fit w-full">
                            No selected photos
                        </div>
                    )
                }
            </div>
        </Gallery>
    );
}
 
export default GalleryBoxOnAddCreation;
