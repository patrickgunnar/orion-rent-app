'use client'

interface DialogEventProps {
    children: React.ReactNode
    className: string
    onClick: () => void
}

// dialog event
const DialogEvent: React.FC<DialogEventProps> = ({
    children, className, onClick
}) => {
    // render content
    return (
        <div className={`cursor-pointer ${className}`} onClick={onClick}>
            {children}
        </div>
    );
}
 
export default DialogEvent;
