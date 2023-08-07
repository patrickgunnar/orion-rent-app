'use client'

interface DialogStoreProps {
    children: React.ReactNode
    className: string
    isOpen: boolean
    onChange: () => void
}

// dialog store
const DialogStore: React.FC<DialogStoreProps> = ({
    children, className, isOpen, onChange
}) => {
    // if not open, return null
    if(!isOpen) return null
    
    // render content
    return (
        <div className="fixed flex justify-center items-center bottom-0 top-0 left-0 right-0 m-auto z-50 h-[100vh] w-[100vw]">
            <div className="absolute bottom-0 top-0 bg-[#38383880] h-full w-full" onClick={onChange} />
            <div className={className}>
                {children}
            </div>
        </div>
    );
}
 
export default DialogStore;
