'use client'

import LoadingElement from "../loading/LoadingElement";


// client only loading state
const LoadingState = () => {
    // render content
    return (
        <div className="flex justify-center items-center my-4 h-[20vh] w-full">
            <div className="flex flex-col justify-center items-center h-full w-fit">
                <div className="relative aspect-square h-[60%]">
                    <LoadingElement />
                </div>
                <div className="font-sans text-sm text-[#191919] animate-pulse">
                    Loading...
                </div>
            </div>
        </div>
    );
}
 
export default LoadingState;
