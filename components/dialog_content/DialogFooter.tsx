'use client'

interface DialogFooterProps {
    children?: React.ReactNode
    className?: string
}

// dialog footer
const DialogFooter: React.FC<DialogFooterProps> = ({
    children, className
}) => {
    // render content
    return (
        <div className={className}>
            {children}
        </div>
    );
}
 
export default DialogFooter;
