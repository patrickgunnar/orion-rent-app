'use client'

import styles from "./styles.module.css"


// orion loading
const LoadingElement = () => {
    // render elements
    return (
        <div className="flex justify-center items-center h-full w-full">
            <div className={`${styles.spinning_container}`}>
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
        </div>
    );
}

export default LoadingElement;
