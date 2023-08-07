'use client'

interface ContentTableProps {
    children?: React.ReactNode
}

// content table elements
const ContentTable: React.FC<ContentTableProps> = ({
    children
}) => {
    // render content
    return (
        <div className="relative rounded-lg from-[#E1DCDC] via-[#F0EBEB] to-[#FFFAFA] bg-gradient-to-b 
            drop-shadow-[0_0_0.1rem] shadow-[#00000080] mx-auto mb-[55px] w-[99.5%] h-fit">
            {children}
        </div>
    );
}
 
export default ContentTable;
