'use client'

interface DialogDescriptionProps {
    children: React.ReactNode
    className: string
}

// dialog description
const DialogDescription: React.FC<DialogDescriptionProps> = ({
    children, className
}) => {
    // render content
    return (
        <div className={className}>
            {children}
        </div>
    );
}
 
export default DialogDescription;
