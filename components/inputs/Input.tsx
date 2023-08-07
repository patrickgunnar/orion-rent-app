'use client'

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { TbCurrencyReal } from "react-icons/tb";


interface TextInputProps {
    id: string
    label: string
    placeholder: string
    type?: string
    disabled?: boolean
    formatPrice?: boolean
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    maxLength: number
    isTextBox?: boolean
    isLabel: boolean
    multiple?: boolean
    accept?: string
    pattern?: string
    onClickStyle?: boolean
    onExtraStyle?: boolean
    isMessages?: boolean
}

// text input
const Input: React.FC<TextInputProps> = ({
    id, label, placeholder, type, disabled, formatPrice, 
    required, register, errors, maxLength, isTextBox, 
    isLabel, multiple, accept, pattern, onClickStyle,
    onExtraStyle, isMessages
}) => {
    // render elements
    return (
        <div className={clsx("flex flex-col w-full",
            isLabel ? 'h-fit' : 'h-full')}>
            {
                isLabel && (
                    <div className={clsx(`flex justify-start items-center text-base font-semibold
                    px-2 my-2 h-fit w-full`,
                        formatPrice ? 'left-9' : 'left-4',
                        errors[id] ? 'text-red-500' : 'text-black',
                        onClickStyle && 'text-sm')}>
                        {label}
                    </div>
                )
            }
            {
                !isTextBox ? (
                    <div className={clsx("relative flex items-center justify-center w-full",
                        isLabel ? 'h-fit' : 'h-full')}>
                        {
                            formatPrice && (
                                <TbCurrencyReal className="absolute left-2"
                                    size={25}
                                />
                            )
                        }
                        <input className={clsx(`flex justify-center items-center shadow-[0_0_0.2rem] overflow-hidden
                        shadow-[#00000080] border-[1px] rounded-lg w-full`,
                            isLabel ? 'h-14' : 'h-full',
                            formatPrice ? 'pl-10' : 'pl-4',
                            errors[id] ? 'border-rose-500' : 'border-[#737373]',
                            errors[id] ? 'focus:border-rose-500' : 'focus:border-black',
                            onClickStyle ? 'p-3' : 'p-2',
                            onClickStyle && 'from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b cursor-pointer',
                            onExtraStyle && "from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b cursor-pointer p-4")}
                            placeholder={placeholder}
                            disabled={disabled}
                            maxLength={maxLength}
                            type={type}
                            accept={accept}
                            multiple={multiple}
                            pattern={pattern}
                            {...register(id, { required })}
                        />
                    </div>
                ) : (
                    <textarea className={clsx(`flex justify-start items-center resize-none shadow-[0_0_0.2rem] 
                    overflow-hidden shadow-[#00000080] border-[1px] rounded-lg p-2 h-48 w-full
                    overflow-y-auto no-scrollbar`,
                        formatPrice ? 'pl-9' : 'pl-4',
                        errors[id] ? 'border-rose-500' : 'border-[#737373]',
                        errors[id] ? 'focus:border-rose-500' : 'focus:border-black',
                        isMessages ? 'm-0' : 'mt-0 mb-4')}
                        placeholder={placeholder}
                        disabled={disabled}
                        maxLength={maxLength}
                        {...register(id, { required })}
                    />
                )
            }
        </div>
    );
}
 
export default Input;
