'use client'

interface InputBoxProps {
    children: React.ReactNode
    childrenClassName: string
    className: string
    labelClassName: string
    titleClassName: string
    subtitleClassName?: string
    title: string
    subtitle?: string
    barClassName: string
}

// input box
const InputBox: React.FC<InputBoxProps> = ({
    children, childrenClassName, className, labelClassName,
    titleClassName, subtitleClassName, title, subtitle, barClassName
}) => {
    // render components
    return (
        <div className={className}>
            <div className={labelClassName}>
                <div className={titleClassName}>
                    {title}
                </div>
                {
                    subtitle && (
                        <div className={subtitleClassName}>
                            {subtitle}
                        </div>
                    )
                }
            </div>
            <div className={barClassName} />
            <div className={childrenClassName}>
                {children}
            </div>
        </div>
    );
}
 
export default InputBox;
