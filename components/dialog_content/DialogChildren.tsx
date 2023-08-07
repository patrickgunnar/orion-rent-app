'use client'

interface DialogChildrenProps {
    children: React.ReactNode
    className: string
}

// dialog children
const DialogChildren: React.FC<DialogChildrenProps> = ({
    children, className
}) => {
    // render content
    return (
        <div className={className}>
            {children}
        </div>
    );
}
 
export default DialogChildren;
