'use client'

interface MainContentProps {
    children?: React.ReactNode
}

// main elements
const MainContent: React.FC<MainContentProps> = ({
    children
}) => {
    // render elements
    return (
        <div className="mt-[62px] h-fit w-full overflow-hidden">
            {children}
        </div>
    );
}
 
export default MainContent;
