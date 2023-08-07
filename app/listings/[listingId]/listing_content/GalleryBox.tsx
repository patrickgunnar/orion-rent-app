'use client'

import { Gallery, Item } from "react-photoswipe-gallery";
import { default as ImageComponent } from "next/image";


interface GalleryBoxProps {
    title: string
    images: string[]
}

// gallery box
const GalleryBox: React.FC<GalleryBoxProps> = ({
    title, images
}) => {
    // render content
    return (
        <Gallery>
            <div className=" flex flex-col justify-start items-center mx-auto mb-8 p-6 drop-shadow-[0_0_0.2rem] 
            shadow-[#00000080] from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b rounded-lg
            h-96 w-[100%] md:w-[80%]">
                <div className="flex justify-center items-center text-base font-bold px-4 h-[10%] w-full">
                    Gallery
                </div>
                <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 
                gap-2 h-[90%] w-full overflow-hidden overflow-y-auto">
                    {
                        images.map(async (imageUrl, index) => {
                            // get current image meta
                            const getMeta = async (url: string) => {
                                // new image
                                const img = new Image()

                                // set source
                                img.src = url
                                // await for decode
                                await img.decode()

                                // return image tag
                                return img
                            }

                            // get current image tag
                            const currentImageMeta = await getMeta(imageUrl)
                            // get the image height
                            const currentImageHeight = currentImageMeta.naturalHeight
                            // get the image width
                            const currentImageWidth = currentImageMeta.naturalWidth
                            // current image alt
                            const currentImageAlt = `${title}, image ${index + 1}`

                            return (
                                <Item key={index}
                                    thumbnail={imageUrl}
                                    original={imageUrl}
                                    height={currentImageHeight}
                                    width={currentImageWidth}>
                                    {
                                        ({ref, open}) => (
                                            <div className="relative flex h-full aspect-square">
                                                <ImageComponent className="object-cover rounded-lg cursor-pointer"
                                                    // @ts-ignore
                                                    ref={ref}
                                                    onClick={open} 
                                                    src={imageUrl} 
                                                    alt={currentImageAlt}
                                                    fill
                                                />
                                            </div>
                                        )
                                    }
                                </Item>
                            )
                        })
                    }
                </div>
            </div>
        </Gallery>
    );
}
 
export default GalleryBox;
