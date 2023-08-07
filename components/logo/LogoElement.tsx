'use client'

import styles from "./styles.module.css"


// orion logo
const LogoElement = () => {
    // render elements
    return (
        <div className="flex justify-center items-center h-full w-full">
            <div className={`${styles.logo_container} drop-shadow-[0_0_0.1rem] shadow-[#00000080]`}></div>
        </div>
    );
}
 
export default LogoElement;
