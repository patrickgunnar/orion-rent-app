'use client'

import ErrorElement from "@/components/error/ErrorElement";


// error page
const Error = () => {
    // render elements
    return (
        <div className="relative h-screen w-full">
            <div className="flex flex-col justify-center items-center mx-auto my-4 h-[20vh] w-fit">
                <div className="relative aspect-square h-[60%]">
                    <ErrorElement />
                </div>
                <div className="font-sans text-sm font-bold text-red-600 animate-pulse">
                    Something wrong just happened...
                </div>
            </div>
        </div>
    );
}
 
export default Error;
