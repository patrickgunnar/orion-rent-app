'use client'

interface DialogTitleProps {
    children: React.ReactNode
    clasName: string
}

// dialog title
const DialogTitle: React.FC<DialogTitleProps> = ({
    children, clasName
}) => {
    // render elements
    return (
        <div className={clasName}>
            {children}
        </div>
    );
}
 
export default DialogTitle;
