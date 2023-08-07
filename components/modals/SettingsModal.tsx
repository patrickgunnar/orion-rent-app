'use client'

import { useUser } from "@/hooks/useUser"
import Modal from "./Modal"
import useSettingsModal from "@/hooks/useSettingsModal"
import Image from "next/image"
import Button from "../buttons/Button"
import { useEffect, useState } from "react"
import { IoAtCircle, IoKey, IoFingerPrint, IoLogOut, IoPersonCircle, IoChevronBack, IoPersonSharp } from "react-icons/io5"
import { BsGridFill } from "react-icons/bs"
import useImage from "@/hooks/useImage"
import clsx from "clsx"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import getHostProperties from "../actions/getHostProperties"
import { PropertyType } from "@/types"
import HostItem from "../settings/HostItem"
import SettingsLoading from "../settings/SettingsLoading"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "../inputs/Input"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import uniqid from "uniqid"


enum STEPS {
    MAIN = 0,
    ADDS = 1,
    IMAGE = 2,
    NAME = 3,
    PASSWORD = 4,
    EMAIL = 5
}

// settings modal
const SettingsModal = () => {
    // use setting modal
    const settingsModal = useSettingsModal()
    // get supabase client
    const supabaseClient = useSupabaseClient()
    // get current user 
    const user = useUser()
    // get router
    const router = useRouter()

    // use state to deal with the current step
    const [step, setStep] = useState<number>(0)
    // use state to deal with user adds
    const [hostProperties, setHostProperties] = useState<PropertyType[] | null>(null)
    // use state to deal with local modal
    const [localModal, setLocalModal] = useState<React.ReactNode | null>(null)
    // use state to deaal with revalidate data
    const [isRevalidate, setIsRevalidate] = useState<boolean>(false)
    // use state to deal with current loading
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // use state to display how to update e-mail on e-mail update request
    const [isUpdateEmail, setIsUpdateEmail] = useState<boolean>(false)
    // use state to display how to update the password on password update request
    const [isUpdatePassword, setIsUpdatePassword] = useState<boolean>(false)
    // use state to deal with user name
    const [currentName, setCurrentName] = useState<string | number>('')
    // use state to deal with user image
    const [currentImagePath, setCurrentImagePath] = useState<string | null | undefined>(null)

    // get user image
    const image = useImage(currentImagePath)

    useEffect(() => {
        // set current name
        setCurrentName(
            user.userDetails?.full_name || user.user?.email || user.userDetails?.phone || 'No Name'
        )
        // set current image
        setCurrentImagePath(user.userDetails?.avatar_url)
    }, [user.userDetails?.full_name, user.user?.email, user.userDetails?.phone, user.userDetails?.avatar_url])

    // use form hook
    const {
        register, handleSubmit, setValue,
        watch, reset, formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            imageUpdate: '',
            nameUpdate: '',
            passwordUpdate: '',
            emailUpdate: ''
        }
    })

    // watch form's values
    const imageUpdate = watch('imageUpdate')
    const nameUpdate = watch('nameUpdate')
    const passwordUpdate = watch('passwordUpdate')
    const emailUpdate = watch('emailUpdate')

    // set user values
    const handleUserValues = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true, shouldDirty: true, shouldTouch: true
        })
    }

    // image update handler
    const handleImageUpdate: SubmitHandler<FieldValues> = async (data) => {
        // set loading to true
        setIsLoading(true)

        try {
            // if image update
            if(data.imageUpdate) {
                // create unique id
                const imageUniqueID = uniqid()
                // get current cover
                const profileImage = data.imageUpdate[0]
                // get extension
                const imageExtension = `${profileImage.type}`.replace('/', '.')

                // upload cover
                const {
                    data: imageData,
                    error: imageError
                } = await supabaseClient.storage.from('profile').upload(
                    `image-${imageUniqueID}-${imageExtension}`, profileImage, {
                        cacheControl: '3600',
                        upsert: false
                    }
                )

                if(imageError) {
                    // set is loading to false
                    setIsLoading(false)

                    return toast.error('Error, try again!')
                }

                // create record on db
                const {
                    error: supaError
                } = await supabaseClient.rpc('update_avatar_url_to_new_one', {
                    image_path: imageData.path, user_id: user.userDetails?.id
                })

                // if record insertion error
                if(supaError) {
                    // set is loading to false
                    setIsLoading(false)

                    return toast.error('Error, try again!')
                }

                // refresh router
                router.refresh()
                // toast success msg
                toast.success('Updated!')
                // reset inputs
                reset()
                // set is loading to false
                setIsLoading(false)
                // set current user image
                setCurrentImagePath(imageData.path)
            } else {
                // set is loading to false
                setIsLoading(false)
                toast.error('All fields are mandatory!')
            }
        } catch (error) {
            // set is loading to false
            setIsLoading(false)
            // display error msg
            toast.error('Error, try again!')
        }
    }

    // name update handler
    const handleNameUpdate: SubmitHandler<FieldValues> = async (data) => {
        // set loading to true
        setIsLoading(true)

        try {
            // if name update
            if(data.nameUpdate) {
                // create record on db
                const {
                    error: supaError
                } = await supabaseClient.rpc('update_user_full_name', {
                    user_name: data.nameUpdate, user_id: user.userDetails?.id
                })

                // if record insertion error
                if(supaError) {
                    // set is loading to false
                    setIsLoading(false)

                    return toast.error('Error, try again!')
                }

                // refresh router
                router.refresh()
                // toast success msg
                toast.success('Updated!')
                // reset inputs
                reset()
                // set is loading to false
                setIsLoading(false)
                // set new name
                setCurrentName(data.nameUpdate)
            } else {
                // set is loading to false
                setIsLoading(false)
                toast.error('All fields are mandatory!')
            }
        } catch (error) {
            // set is loading to false
            setIsLoading(false)
            // display error msg
            toast.error('Error, try again!')
        }
    }

    // password update handler
    const handlePasswordUpdate: SubmitHandler<FieldValues> = async (data) => {
        // set loading to true
        setIsLoading(true)

        try {
            // if password update
            if(data.passwordUpdate) {
                // create record on db
                const {
                    error: supaError
                } = await supabaseClient.auth.resetPasswordForEmail(data.passwordUpdate)

                // if record insertion error
                if(supaError) {
                    // set is loading to false
                    setIsLoading(false)

                    return toast.error('Error, please check the email entered!')
                }

                // refresh router
                router.refresh()
                // toast success msg
                toast.success('Password update email sent successfully!')
                // reset inputs
                reset()
                // set is loading to false
                setIsLoading(false)
                // set update password request to true
                setIsUpdatePassword(true)
            } else {
                // set is loading to false
                setIsLoading(false)
                toast.error('All fields are mandatory!')
            }
        } catch (error) {
            // set is loading to false
            setIsLoading(false)
            // display error msg
            toast.error('Error, try again!')
        }
    }

    // email update handler
    const handleEmailUpdate: SubmitHandler<FieldValues> = async (data) => {
        // set loading to true
        setIsLoading(true)

        try {
            // if email update
            if(data.emailUpdate) {
                // create record on db
                const {
                    error: supaError
                } = await supabaseClient.auth.updateUser({
                    email: data.emailUpdate
                })

                // if record insertion error
                if(supaError) {
                    // set is loading to false
                    setIsLoading(false)

                    return toast.error('Error, please check the email entered!')
                }

                // refresh router
                router.refresh()
                // toast success msg
                toast.success('Update email sent successfully!')
                // reset inputs
                reset()
                // set is loading to false
                setIsLoading(false)
                // set email update request to true
                setIsUpdateEmail(true)
            } else {
                // set is loading to false
                setIsLoading(false)
                toast.error('All fields are mandatory!')
            }
        } catch (error) {
            // set is loading to false
            setIsLoading(false)
            // display error msg
            toast.error('Error, try again!')
        }
    }

    // on change modal handler
    const onChangeHandler = (isOpen: boolean) => {
        // if modal is opened
        // close it
        if(isOpen) settingsModal.onClose()
        // reset step
        setStep(0)
    }

    // handle sign out
    const handleLogout = () => {
        // close modal
        settingsModal.onClose()
        // sign out
        supabaseClient.auth.signOut()
    }

    useEffect(() => {
        // handle host properties
        // get host adds
        const handleHostProperties = async () => setHostProperties(await getHostProperties(user.userDetails?.id))

        // if current step is adds
        if(step === STEPS.ADDS) handleHostProperties()
        // if current step is adds and is to revalidate the data
        if(step === STEPS.ADDS && isRevalidate) handleHostProperties()
    }, [user.userDetails?.id, step, isRevalidate])

    // back button 
    const backButton = (
        <div className="flex justify-start items-center h-fit w-full">
            <div className="flex justify-center items-center cursor-pointer gap-1 h-fit w-fit
            text-gray-700 font-semibold hover:opacity-75" onClick={() => setStep(0)}>
                <IoChevronBack size={20} />
                Back
            </div>
        </div>
    )

    let currentPage = (
        <div className="flex flex-col justify-start items-center gap-2 h-full w-full">
            <div className="flex flex-col justify-center items-center my-4 h-fit w-full">
                {
                    image ? (
                        <div className="relative flex w-[20%] aspect-square rounded-full drop-shadow-[0_0_0.1rem] 
                        shadow-[#00000080] border-[#737373] border-[1px] mb-1 overflow-hidden">
                            <Image className="object-cover"
                                src={image}
                                alt={currentName.toString()}
                                fill
                            />
                        </div>
                    ) : (
                        <div className="relative flex w-[20%] aspect-square mb-1 overflow-hidden">
                            <IoPersonSharp className="h-full w-full" />
                        </div>
                    )
                }
                <div className="flex flex-col justify-center items-center h-fit w-full">
                    <div className={clsx("relative truncate text-center text-xl font-normal p-1 h-fit w-full",
                    user.userDetails?.full_name && "capitalize")}>
                        {currentName}
                    </div>
                    <div className="flex justify-center items-center cursor-pointer font-normal text-sm text-gray-700 
                    gap-1 h-fit w-fit hover:opacity-75" onClick={handleLogout}>
                        <IoLogOut size={18} />
                        Log out
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center p-2 gap-2 h-fit w-[95%]">
            <Button className="flex justify-start items-center drop-shadow-[0_0_0.1rem] shadow-[#00000080] 
                from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b rounded-lg font-normal text-sm 
                text-gray-700 gap-2 p-2 h-fit w-full hover:opacity-75" onClick={() => setStep(1)}>
                    <BsGridFill size={20} />
                    My Advertisements
                </Button>
                <Button className="flex justify-start items-center drop-shadow-[0_0_0.1rem] shadow-[#00000080] 
                from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b rounded-lg font-normal text-sm 
                text-gray-700 gap-2 p-2 h-fit w-full hover:opacity-75" onClick={() => setStep(2)}>
                    <IoPersonCircle size={20} />
                    Change Profile Picture
                </Button>
                <Button className="flex justify-start items-center drop-shadow-[0_0_0.1rem] shadow-[#00000080] 
                from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b rounded-lg font-normal text-sm 
                text-gray-700 gap-2 p-2 h-fit w-full hover:opacity-75" onClick={() => setStep(3)}>
                    <IoFingerPrint size={20} />
                    Change Name
                </Button>
                <Button className="flex justify-start items-center drop-shadow-[0_0_0.1rem] shadow-[#00000080] 
                from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b rounded-lg font-normal text-sm 
                text-gray-700 gap-2 p-2 h-fit w-full hover:opacity-75" onClick={() => setStep(4)}>
                    <IoKey size={20} />
                    Update Password
                </Button>
                <Button className="flex justify-start items-center drop-shadow-[0_0_0.1rem] shadow-[#00000080] 
                from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b rounded-lg font-normal text-sm 
                text-gray-700 gap-2 p-2 h-fit w-full hover:opacity-75" onClick={() => setStep(5)}>
                    <IoAtCircle size={20} />
                    Update E-mail
                </Button>
            </div>
        </div>
    )

    // if current step is adds
    if(step === STEPS.ADDS) currentPage = (
        <div className="flex flex-col justify-start items-center gap-4 h-full w-full">
            {backButton}
            {
                hostProperties ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-fit w-full">
                        {
                            hostProperties.map(item => (
                                <HostItem key={item.id} 
                                    hostProperty={item} 
                                    setLocalModal={setLocalModal}
                                    setRevalidate={setIsRevalidate}
                                />
                            ))
                        }
                    </div>
                ) : (<SettingsLoading />)
            }
        </div>
    )

    // if current step is image
    if(step === STEPS.IMAGE) currentPage = (
        <div className="flex flex-col justify-start items-center gap-4 h-full w-full">
            {backButton}
            <div className="flex flex-col justify-start items-center gap-10 h-fit w-[90%]">
                <Input id="imageUpdate"
                    isLabel
                    label="Select an image"
                    placeholder="Select"
                    maxLength={1}
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    type="file"
                    accept='image/*'
                    onExtraStyle
                />
                <Button className="flex justify-center items-center text-xs font-bold rounded-lg text-white
                from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] shadow-[#00000080] 
                border-[#737373] border-[1px] hover:from-[#c71e02] hover:to-[#c71e02] p-2 h-fit w-[30%]"
                type="submit" onClick={handleSubmit(handleImageUpdate)}>
                    Update
                </Button>
            </div>
        </div>
    )

    // if current step is name
    if(step === STEPS.NAME) currentPage = (
        <div className="flex flex-col justify-start items-center gap-4 h-full w-full">
            {backButton}
            <div className="flex flex-col justify-start items-center gap-10 h-fit w-[90%]">
                <Input id="nameUpdate"
                    isLabel
                    label="Name"
                    placeholder="Full name"
                    maxLength={50}
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    type="text"
                />
                <Button className="flex justify-center items-center text-xs font-bold rounded-lg text-white
                from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] shadow-[#00000080] 
                border-[#737373] border-[1px] hover:from-[#c71e02] hover:to-[#c71e02] p-2 h-fit w-[30%]"
                type="submit" onClick={handleSubmit(handleNameUpdate)}>
                    Update
                </Button>
            </div>
        </div>
    )

    // if current step is password
    if(step === STEPS.PASSWORD) currentPage = (
        <div className="flex flex-col justify-start items-center gap-4 h-full w-full">
            {backButton}
            <div className="flex flex-col justify-start items-center gap-10 h-fit w-[90%]">
                <Input id="passwordUpdate"
                    isLabel
                    label="Update password e-mail"
                    placeholder="Your registration email for password change"
                    maxLength={50}
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    type="text"
                />
                <Button className="flex justify-center items-center text-xs font-bold rounded-lg text-white
                from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] shadow-[#00000080] 
                border-[#737373] border-[1px] hover:from-[#c71e02] hover:to-[#c71e02] p-2 h-fit w-[30%]"
                type="submit" onClick={handleSubmit(handlePasswordUpdate)}>
                    Update
                </Button>
            </div>
            {
                isUpdatePassword && (
                    <div className="flex flex-col justify-center items-center h-fit w-full text-center text-[#737373] 
                    mt-12 text-base font-bold">
                        <div>Confirm the password update link in your registration email</div>
                        <div>Check the spam folder</div>
                    </div>
                )
            }
        </div>
    )

    // if current step is e-mail
    if(step === STEPS.EMAIL) currentPage = (
        <div className="flex flex-col justify-start items-center gap-4 h-full w-full">
            {backButton}
            <div className="flex flex-col justify-start items-center gap-10 h-fit w-[90%]">
                <Input id="emailUpdate"
                    isLabel
                    label="New e-mail"
                    placeholder="Your registered e-mail"
                    maxLength={50}
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    type="text"
                />
                <Button className="flex justify-center items-center text-xs font-bold rounded-lg text-white
                from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] shadow-[#00000080] 
                border-[#737373] border-[1px] hover:from-[#c71e02] hover:to-[#c71e02] p-2 h-fit w-[30%]"
                type="submit" onClick={handleSubmit(handleEmailUpdate)}>
                    Update
                </Button>
            </div>
            {
                isUpdateEmail && (
                    <div className="flex flex-col justify-center items-center h-fit w-full text-center text-[#737373] 
                    mt-12 text-base font-bold">
                        <div>Confirm the email update, first in the old email and then in the new email</div>
                        <div>Check the spam folder</div>
                    </div>
                )
            }
        </div>
    )

    // render elements
    return (
        <Modal
            title="Account Settings"
            description="Manage your account settings."
            isOpen={settingsModal.isOpen}
            onChange={() => onChangeHandler(settingsModal.isOpen)}>
            {currentPage}
            {localModal}
        </Modal>
    );
}
 
export default SettingsModal;
