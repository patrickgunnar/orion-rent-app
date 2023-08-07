'use client'

import LoadingElement from "../loading/LoadingElement";


// settings loading
const SettingsLoading = () => {
    // render content
    return (
        <div className="relative h-screen w-full">
            <div className="flex flex-col justify-center items-center my-4 mx-auto h-[20vh] w-fit">
                <div className="relative aspect-square h-[60%]">
                    <LoadingElement />
                </div>
                <div className="font-sans text-sm text-[#4b4b4b] animate-pulse">
                    Loading...
                </div>
            </div>
        </div>
    );
}
 
export default SettingsLoading;
