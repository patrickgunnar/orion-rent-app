'use client'

interface DialogHeaderProps {
    children: React.ReactNode
    className: string
}

// dialog header
const DialogHeader: React.FC<DialogHeaderProps> = ({
    children, className
}) => {
    // render content
    return (
        <div className={className}>
            {children}
        </div>
    );
}
 
export default DialogHeader;
