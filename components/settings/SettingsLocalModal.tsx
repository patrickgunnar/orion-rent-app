'use client'

interface SettingsLocalModalProps {
    children: React.ReactNode
    onChange: () => void
}

// settings local modal
const SettingsLocalModal: React.FC<SettingsLocalModalProps> = ({
    children, onChange
}) => {
    // render content
    return (
        <div className="fixed flex justify-center items-center bottom-0 top-0 left-0 right-0 m-auto z-60 h-full w-full">
            <div className="absolute bottom-0 top-0 bg-[#38383880] h-full w-full" onClick={onChange} />
            <div className="flex flex-col justify-start items-center rounded-lg drop-shadow-[0_0_0.5rem]
            shadow-[#00000080] from-[#E1DCDC] via-[#F0EBEB] to-[#FFFAFA] bg-gradient-to-b overflow-hidden 
            transition-transform duration-1000 p-4 h-[90%] w-[80%]">
                <div className="flex justify-center items-start overflow-hidden overflow-y-auto h-max w-full transition">
                    {children}
                </div>
            </div>
        </div>
    );
}
 
export default SettingsLocalModal;
