'use client'

import Modal from "./Modal"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import useAddModal from "@/hooks/useAddModal"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Button from "../buttons/Button"
import Input from "../inputs/Input"
import Counter from "../inputs/Counter"
import { BiMinus, BiPlus } from "react-icons/bi"
import InputBox from "../navbar/InputBox"
import ListInput from "../inputs/ListInput"
import CategorySelect from "../inputs/CategorySelect"
import LocationSelectOnAddCreation from "../inputs/LocationSelectOnAddCreation"
import DatePickerOnAddCreation from "../inputs/DatePickerOnAddCreation"
import GalleryBoxOnAddCreation from "../inputs/GalleryBoxOnAddCreation"
import { toast } from "react-hot-toast"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import uniqid from "uniqid"
import { useUser } from "@/hooks/useUser"


enum STEPS {
    GUIDE = 0,
    DESCRIPTION = 1,
    INFO = 2,
    COMMODITY = 3,
    CATEGORY = 4,
    LOCATION = 5,
    RESERVATION = 6,
    IMAGES = 7
}

// add modal
const AddModal = () => {
    // use add modal
    const addModal = useAddModal()
    // get router hook
    const router = useRouter()
    // get supabase client 
    const supabaseClient = useSupabaseClient()
    // get current user
    const { user } = useUser()

    // use state to deal with current step
    const [step, setStep] = useState<number>(0)
    // use state to deal with current loading
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // use form hook
    const {
        register, handleSubmit, setValue,
        watch, reset, formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            propertyTitle: '',
            propertyDescription: '',
            propertyBedrooms: 0,
            propertyBathroom: 0,
            propertyTotalGuest: 0,
            propertyPrice: 0,
            propertyPhone: '',
            propertyCommodities: [],
            propertyCategory: {},
            propertyLocation: {},
            propertyReservation: [],
            propertyImages: [],
            propertyCover: ''
        }
    })

    // watching from's values 
    const propertyTitle = watch('propertyTitle') 
    const propertyDescription = watch('propertyDescription')
    const propertyBedrooms = watch('propertyBedrooms')
    const propertyBathroom = watch('propertyBathroom')
    const propertyTotalGuest = watch('propertyTotalGuest')
    const propertyPrice = watch('propertyPrice')
    const propertyPhone = watch('propertyPhone')
    const propertyCommodities = watch('propertyCommodities')
    const propertyCategory = watch('propertyCategory')
    const propertyLocation = watch('propertyLocation')
    const propertyReservation = watch('propertyReservation')
    const propertyImages = watch('propertyImages')
    const propertyCover = watch('propertyCover')

    // set user values
    const handleUserValues = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true, shouldDirty: true, shouldTouch: true
        })
    }

    // previous step handler
    const handlePrevious = () => setStep(value => value - 1)
    // next step handler
    const handleNext = () => setStep(value => value + 1)

    // convert diacritics to normal chars
    const convertDiacritics = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    // submit handler
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            // if not the last step, return next step
            if(step !== STEPS.IMAGES) return handleNext()

            // set loading to true
            setIsLoading(true)

            if(data.propertyTitle && data.propertyDescription && data.propertyBedrooms && 
            data.propertyBathroom && data.propertyTotalGuest && data.propertyPrice && 
            data.propertyPhone && data.propertyCommodities && data.propertyCategory && 
            data.propertyLocation && data.propertyImages && data.propertyCover) {
                // get array with image files
                const imagePaths: string[] = []

                for(let imageItem of data.propertyImages) {
                    // get extension
                    const extension = `${imageItem.type}`.replace('/', '.')
                    // create unique id
                    const uniqueID = uniqid()

                    // upload images
                    const {
                        data: imageData,
                        error: imageError
                    } = await supabaseClient.storage.from('images').upload(
                        `image-${uniqueID}-${extension}`, imageItem, {
                            cacheControl: '3600',
                            upsert: false
                        }
                    )

                    if(imageError) {
                        // set is loading to false
                        setIsLoading(false)

                        return toast.error('Image upload error, try again!')
                    }

                    imagePaths.push(imageData.path)
                }

                // create unique id
                const coverUniqueID = uniqid()
                // get current cover
                const imageCoverItem = data.propertyCover[0]
                // get extension
                const coverExtension = `${imageCoverItem.type}`.replace('/', '.')

                // upload cover
                const {
                    data: imageCover,
                    error: coverError
                } = await supabaseClient.storage.from('images').upload(
                    `image-${coverUniqueID}-${coverExtension}`, imageCoverItem, {
                        cacheControl: '3600',
                        upsert: false
                    }
                )

                if(coverError) {
                    // set is loading to false
                    setIsLoading(false)

                    return toast.error('Cover image upload error, try again!')
                }

                // create record on db
                const {
                    error: supaError
                } = await supabaseClient.from('properties').insert({
                    image_path: imagePaths,
                    cover_image: imageCover.path,
                    title: data.propertyTitle,
                    description: data.propertyDescription,
                    user_id: user?.id,
                    phone: data.propertyPhone.toString(),
                    category: data.propertyCategory.id,
                    roomcount: data.propertyBedrooms,
                    bathroomcount: data.propertyBathroom,
                    guestcount: data.propertyTotalGuest,
                    locationvalue: data.propertyLocation,
                    locationid: data.propertyLocation.id,
                    price: data.propertyPrice,
                    reservation: data.propertyReservation,
                    commodities: data.propertyCommodities,
                    renewed: false
                })

                // if record insertion error
                if(supaError) {
                    // set is loading to false
                    setIsLoading(false)

                    return toast.error('Data creation error, try again!')
                }

                // refresh router
                router.refresh()
                // toast success msg
                toast.success('Advertise with success!')
                // reset inputs
                reset()
                // close modal
                addModal.onClose()
                // set step to 0
                setStep(0)
                // set is loading to false
                setIsLoading(false)
            } else {
                // set is loading to false
                setIsLoading(false)
                toast.error('All fields, but for reservations, are mandatory!')
            }
        } catch (error) {
            // set is loading to false
            setIsLoading(false)
            // display error msg
            toast.error('Data creation error, try again!')
        }
    }

    // button action label
    const buttonLabelHandler = useMemo(() => {
        // if current step is the last one
        if(step === STEPS.IMAGES) return 'Create'

        // else
        return 'Next'
    }, [step])

    // second button action label
    const secondButtonLabelHandler = useMemo(() => {
        // if current step is the last one
        if(step === STEPS.GUIDE) return undefined

        // else
        return 'Previous'
    }, [step])

    // on change modal handler
    const onChangeHandler = (isOpen: boolean) => {
        // if modal is opened
        // close it
        if(isOpen) addModal.onClose()
    }

    // current action labels
    const currentAction: React.ReactNode = (
        <div className="flex justify-center items-center h-fit w-full">
            {
                secondButtonLabelHandler && (
                    <Button className="flex justify-center items-center text-base font-bold text-white 
                    rounded-lg from-[#751a07] via-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] 
                    shadow-[#00000080] border-[#737373] border-[1px] hover:from-[#751a07] hover:to-[#751a07]
                    mt-8 mb-2 mx-4 md:mx-8 p-4 h-fit w-[40%] md:w-[30%]" onClick={handlePrevious}>
                        {secondButtonLabelHandler}
                    </Button>
                )
            }
            <Button className="flex justify-center items-center text-base font-bold text-white 
            rounded-lg from-[#751a07] via-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] 
            shadow-[#00000080] border-[#737373] border-[1px] hover:from-[#751a07] hover:to-[#751a07]
            mt-8 mb-2 mx-4 md:mx-8 p-4 h-fit w-[40%] md:w-[30%]"
            type={step === STEPS.IMAGES ? "submit" : "button"}
            onClick={step === STEPS.IMAGES ? handleSubmit(onSubmit) : handleNext}>
                {buttonLabelHandler}
            </Button>
        </div>
    )

    // current step layout
    let currentLayout: React.ReactNode = (
        <div className="flex flex-col justify-center items-start gap-4 text-base h-fit w-[95%]">
            <div className="flex justify-start items-center text-base font-semibold
            text-black left-4 px-2 mt-2 mb-4 h-fit w-full">
                Post rules
            </div>
            <div className="list-item px-2">The advertisement will be available for 15 days after its publication. At the end of this period, you can renew the advertisement in your account settings under My Ads and then click Renew Ad.</div>
            <div className="list-item px-2">The advertisement cannot be edited after publication. However, you can add unavailable dates to the advertisement in your account settings under My Ads and then click Add Reservations.</div>
            <div className="list-item px-2">All fields are mandatory, except for the Reservations field.</div>
            <div className="list-item px-2">You can fill in the field for the price of the property with a 0 to indicate that the price is negotiable.</div>
        </div>
    )
    
    // if current step is description
    if(step === STEPS.DESCRIPTION) currentLayout = (
        <div className="flex flex-col justify-center items-start h-fit w-[95%]">
            <Input id="propertyTitle"
                isLabel
                label="Title"
                placeholder="Name of your property"
                maxLength={50}
                register={register}
                errors={errors}
                disabled={isLoading}
                type="text"
                required
            />
            <Input id="propertyDescription"
                isLabel
                isTextBox
                label="Description"
                placeholder="Tell the details of your property"
                maxLength={2000}
                register={register}
                errors={errors}
                disabled={isLoading}
                type="text"
                required
            />
        </div>
    )

    // if current step is info
    if(step === STEPS.INFO) currentLayout = (
        <div className="flex flex-col justify-center items-start h-fit w-[95%]">
            <InputBox className="flex justify-between items-center p-2 my-2 h-fit md:h-14 shadow-[0_0_0.2rem] 
                shadow-[#00000080] border-[#737373] border-[1px] rounded-lg w-full overflow-hidden
                flex-col md:flex-row"
                labelClassName="flex flex-col justify-center items-start h-full w-full md:w-[65%] overflow-hidden"
                titleClassName="text-black text-sm font-bold h-fit"
                subtitleClassName="text-[#636363] text-base font-normal h-fit"
                barClassName="bg-[#737373] h-0 w-0 md:h-[80%] md:w-[1px]"
                title="Bedrooms"
                subtitle="How many bedrooms?"
                childrenClassName="flex justify-center items-center my-2 md:my-0 h-full w-full md:w-[30%]">
                <Counter contentClassName="flex justify-between items-center h-10 md:h-full w-full"
                    buttonsClassName="flex items-center justify-center aspect-square rounded-lg text-white
                    from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] shadow-[#00000080] 
                    border-[#737373] border-[1px] h-full hover:from-[#c71e02] hover:to-[#c71e02]"
                    valueClassName="flex items-center justify-center cursor-default h-full w-fit"
                    rightIcon={BiPlus}
                    leftIcon={BiMinus}
                    value={propertyBedrooms}
                    onChange={(value) => handleUserValues('propertyBedrooms', value)}
                />
            </InputBox>
            <InputBox className="flex justify-between items-center p-2 my-2 h-fit md:h-14 shadow-[0_0_0.2rem] 
                shadow-[#00000080] border-[#737373] border-[1px] rounded-lg w-full overflow-hidden
                flex-col md:flex-row"
                labelClassName="flex flex-col justify-center items-start h-full w-full md:w-[65%] overflow-hidden"
                titleClassName="text-black text-sm font-bold h-fit"
                subtitleClassName="text-[#636363] text-base font-normal h-fit"
                barClassName="bg-[#737373] h-0 w-0 md:h-[80%] md:w-[1px]"
                title="Bathrooms"
                subtitle="How many bathrooms?"
                childrenClassName="flex justify-center items-center my-2 md:my-0 h-full w-full md:w-[30%]">
                <Counter contentClassName="flex justify-between items-center h-10 md:h-full w-full"
                    buttonsClassName="flex items-center justify-center aspect-square rounded-lg text-white
                    from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] shadow-[#00000080] 
                    border-[#737373] border-[1px] h-full hover:from-[#c71e02] hover:to-[#c71e02]"
                    valueClassName="flex items-center justify-center cursor-default h-full w-fit"
                    rightIcon={BiPlus}
                    leftIcon={BiMinus}
                    value={propertyBathroom}
                    onChange={(value) => handleUserValues('propertyBathroom', value)}
                />
            </InputBox>
            <InputBox className="flex justify-between items-center p-2 my-2 h-fit md:h-14 shadow-[0_0_0.2rem] 
                shadow-[#00000080] border-[#737373] border-[1px] rounded-lg w-full overflow-hidden
                flex-col md:flex-row"
                labelClassName="flex flex-col justify-center items-start h-full w-full md:w-[65%] overflow-hidden"
                titleClassName="text-black text-sm font-bold h-fit"
                subtitleClassName="text-[#636363] text-base font-normal h-fit"
                barClassName="bg-[#737373] h-0 w-0 md:h-[80%] md:w-[1px]"
                title="Guests"
                subtitle="How many guests?"
                childrenClassName="flex justify-center items-center my-2 md:my-0 h-full w-full md:w-[30%]">
                <Counter contentClassName="flex justify-between items-center h-10 md:h-full w-full"
                    buttonsClassName="flex items-center justify-center aspect-square rounded-lg text-white
                    from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] shadow-[#00000080] 
                    border-[#737373] border-[1px] h-full hover:from-[#c71e02] hover:to-[#c71e02]"
                    valueClassName="flex items-center justify-center cursor-default h-full w-fit"
                    rightIcon={BiPlus}
                    leftIcon={BiMinus}
                    value={propertyTotalGuest}
                    onChange={(value) => handleUserValues('propertyTotalGuest', value)}
                />
            </InputBox>
            <InputBox className="flex justify-between items-center p-2 my-2 h-fit md:h-14 shadow-[0_0_0.2rem] 
                shadow-[#00000080] border-[#737373] border-[1px] rounded-lg w-full overflow-hidden
                flex-col md:flex-row"
                labelClassName="flex flex-col justify-center items-start h-full w-full md:w-[65%] overflow-hidden"
                titleClassName="text-black text-sm font-bold h-fit"
                subtitleClassName="text-[#636363] text-base font-normal h-fit"
                barClassName="bg-[#737373] h-0 w-0 md:h-[80%] md:w-[1px]"
                title="Price"
                subtitle="How much for the rent?"
                childrenClassName="flex justify-center items-start my-2 md:my-0 h-full w-full md:w-[30%]">
                    <Input id="propertyPrice"
                        formatPrice
                        isLabel={false}
                        label=""
                        placeholder="Price"
                        maxLength={50}
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                        type="number"
                        required
                    />
            </InputBox>
            <InputBox className="flex justify-between items-center p-2 my-2 h-fit md:h-14 shadow-[0_0_0.2rem] 
                shadow-[#00000080] border-[#737373] border-[1px] rounded-lg w-full overflow-hidden
                flex-col md:flex-row"
                labelClassName="flex flex-col justify-center items-start h-full w-full md:w-[65%] overflow-hidden"
                titleClassName="text-black text-sm font-bold h-fit"
                subtitleClassName="text-[#636363] text-base font-normal h-fit"
                barClassName="bg-[#737373] h-0 w-0 md:h-[80%] md:w-[1px]"
                title="Contact"
                subtitle="What is your phone number?"
                childrenClassName="flex justify-center items-start my-2 md:my-0 h-full w-full md:w-[30%]">
                    <Input id="propertyPhone"
                        isLabel={false}
                        label=""
                        placeholder="Phone number"
                        maxLength={20}
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                        type="number"
                        required
                    />
            </InputBox>
        </div>
    )

    // if current step is commodity
    if(step === STEPS.COMMODITY) currentLayout = (
        <div className="flex flex-col justify-center items-start h-fit w-[95%]">
            <ListInput id="propertyCommodity"
                label="Add commodity"
                placeholder="Type the commodity"
                maxLength={15}
                disabled={isLoading}
                value={propertyCommodities}
                onClick={(value) => handleUserValues('propertyCommodities', value)}
            />
            <div className="h-0 md:h-[157px]"></div>
        </div>
    )

    // if current step is category
    if(step === STEPS.CATEGORY) currentLayout = (
        <div className="flex flex-col justify-center items-start h-fit w-[95%]">
            <div className="flex justify-start items-center text-base font-semibold
            text-black left-4 px-2 mt-2 mb-4 h-fit w-full">
                Select a category
            </div>
            <CategorySelect className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 p-2 mb-6 h-fit w-full"
                value={propertyCategory}
                onClick={(value) => handleUserValues('propertyCategory', value)}
            />
        </div>
    )

    // if current step is location
    if(step === STEPS.LOCATION) currentLayout = (
        <div className="flex flex-col justify-center items-start h-fit w-[95%]">
            <LocationSelectOnAddCreation placeholder="Search for a region (ONLY BRAZILIAN REGIONS AVAILABLE)"
                value={propertyLocation}
                onClick={(value) => handleUserValues('propertyLocation', value)}
            />
        </div>
    )

    // if current step is reservations
    if(step === STEPS.RESERVATION) currentLayout = (
        <div className="flex flex-col justify-center items-start h-fit w-[95%]">
            <DatePickerOnAddCreation
                reservationValue={propertyReservation}
                onClick={(value) => handleUserValues('propertyReservation', value)}
            />
        </div>
    )

    // if current step is images
    if(step === STEPS.IMAGES) currentLayout = (
        <div className="flex flex-col justify-center items-start h-fit w-[95%]">
            <div className="flex justify-center items-center text-base font-semibold
            text-[#737373] left-4 px-2 mt-2 mb-4 h-fit w-full">
                Photos of the property
            </div>
            <div className="flex justify-between items-end gap-3 h-fit w-full">
                <Input id="propertyImages"
                    isLabel
                    label="Please select up to 30 photos of the property"
                    placeholder="Selecionar"
                    maxLength={30}
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    type="file"
                    accept='image/*'
                    multiple
                    required
                    onClickStyle
                />
                <Input id="propertyCover"
                    isLabel
                    label="Select the cover image"
                    placeholder="Selecionar"
                    maxLength={1}
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    type="file"
                    accept='image/*'
                    required
                    onClickStyle
                />
            </div>
            <GalleryBoxOnAddCreation
                currentImages={propertyCover ? (
                    [propertyCover[0], ...propertyImages as unknown as []]
                ) : (
                    [...propertyImages as unknown as []]
                )}
            />
        </div>
    )

    // render elements
    return (
        <Modal
            title="Advertise"
            description="Create the advertising of your property."
            isOpen={addModal.isOpen}
            footer={currentAction}
            onChange={() => onChangeHandler(addModal.isOpen)}>
            {currentLayout}
        </Modal>
    );
}
 
export default AddModal;
