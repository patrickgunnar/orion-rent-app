'use client'

import styles from "./styles.module.css"


// error element
const ErrorElement = () => {
    // render content
    return (
        <div className="flex justify-center items-center h-full w-full">
            <div className={`${styles.ellipsis_container}`}>
                <div></div><div></div><div></div><div></div>
            </div>
        </div>
    );
}
 
export default ErrorElement;
