'use client'

import useCoverImage from "@/hooks/useCoverImage";
import { PropertyType } from "@/types";
import Image from "next/image";
import Button from "../buttons/Button";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSettingsModal from "@/hooks/useSettingsModal";
import clsx from "clsx";
import SettingsLocalModal from "./SettingsLocalModal";
import DatePickerOnAddCreation from "../inputs/DatePickerOnAddCreation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";


interface HostItemProps {
    hostProperty: PropertyType
    setLocalModal: (value: React.ReactNode | null) => void
    setRevalidate: (value: boolean) => void
}

// host item
const HostItem: React.FC<HostItemProps> = ({
    hostProperty, setLocalModal, setRevalidate
}) => {
    // get supabase client 
    const supabaseClient = useSupabaseClient()
    // get router
    const router = useRouter()
    // get settings modal
    const settingsModal = useSettingsModal()
    // get property cover url
    const property = useCoverImage([hostProperty])[0]

    // use state to deal with adding reservations dates
    const [newReservations, setNewReservations] = useState<Date[]>(
        property.reservation.map(item => new Date(item))
    )
    // use state to deal with open close local modal
    const [isOpen, setIsOpen] = useState<boolean>(false)

    // renewd button is disabled or enabled
    const isRenewed = !(new Date(property.current_period_end) >= new Date())

    // handle the reservation new dates update
    const handleNewReservations = useCallback(async () => {
        // if current new dates
        if(newReservations) {
            const {
                error: newReservationsError
            } = await supabaseClient.rpc('update_reservations', {
                new_reservations: newReservations, property_id: property.id
            })

            // if any error
            if(newReservationsError) return toast.error('Error, try again!')

            // revaliidate data
            setRevalidate(true)
            // refresh page
            router.refresh()
            // toast success msg
            toast.success('Updated!')
        }
    }, [newReservations, supabaseClient, router, property.id, setRevalidate])

    // handle renewd add
    const renewAdvertising = useCallback(async (ev: MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation()

        const {
            error: renewedError
        } = await supabaseClient.rpc('renew_my_property', {
            property_id: property.id
        })

        // if any error
        if(renewedError) return toast.error('Error, try again!')

        // revaliidate data
        setRevalidate(true)
        // refresh page
        router.refresh()
        // toast success msg
        toast.success('Renewed announcement successfully!')
    }, [supabaseClient, property.id, setRevalidate, router])

    useEffect(() => {
        if(isOpen) {
            // set local modal
            setLocalModal(
                <SettingsLocalModal onChange={() => setIsOpen(false)}>
                    <div className="flex flex-col justify-center items-center h-fit w-full">
                        <DatePickerOnAddCreation reservationValue={newReservations}
                            onClick={setNewReservations}
                        />
                        <div className="flex justify-center items-center gap-4 mt-6 h-fit w-full">
                            <Button className="flex justify-center items-center text-xs font-bold rounded-lg text-white
                            from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] shadow-[#00000080] 
                            border-[#737373] border-[1px] hover:from-[#c71e02] hover:to-[#c71e02] p-2 h-fit w-[30%]"
                            onClick={() => setIsOpen(false)}>
                                Close
                            </Button>
                            <Button className="flex justify-center items-center text-xs font-bold rounded-lg text-white
                            from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] shadow-[#00000080] 
                            border-[#737373] border-[1px] hover:from-[#c71e02] hover:to-[#c71e02] p-2 h-fit w-[30%]"
                            onClick={handleNewReservations}>
                                Update
                            </Button>
                        </div>
                    </div>
                </SettingsLocalModal>
            )
        } else setLocalModal(null)
    }, [isOpen, newReservations, setLocalModal, handleNewReservations])

    // on click handler
    const onClickHandler = (ev: MouseEvent<HTMLDivElement>) => {
        ev.stopPropagation()

        // push to listings page
        router.push(`/listings/${property.id}`)
        // close modal
        settingsModal.onClose()
    }

    // handle add reservations
    const reservationsHandler = (ev: MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation()

        // open local modal
        setIsOpen(true)
    }

    // render content
    return (
        <div className="flex flex-col justify-start items-start h-full w-full" onClick={onClickHandler}>
            <div className="relative w-full aspect-square rounded-lg my-1 overflow-hidden">
                <Image className="object-cover"
                    src={property.cover_image}
                    alt={property.title}
                    fill
                />
            </div>
            <div className="relative truncate text-left text-sm text-black font-bold h-fit w-full">
                {property.title}
            </div>
            <div className="flex flex-col justify-center items-center gap-2 my-2 h-fit w-full">
                <Button className="flex justify-center items-center text-xs font-bold rounded-lg text-white
                    from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] shadow-[#00000080] 
                    border-[#737373] border-[1px] hover:from-[#c71e02] hover:to-[#c71e02] p-2 h-fit w-full"
                    onClick={reservationsHandler}>
                    Add Resservation
                </Button>
                <Button className={clsx(`flex justify-center items-center text-xs font-bold rounded-lg text-white
                    bg-gradient-to-t shadow-[0_0_0.2rem] shadow-[#00000080] border-[#737373] border-[1px] p-2 
                    h-fit w-full`,
                    !isRenewed ? "from-[#676666] via-[#8e8e8e] to-[#d5d4d4]" : "from-[#9f2809] to-[#c71e02]",
                    isRenewed && "hover:from-[#c71e02] hover:to-[#c71e02]")}
                    disabled={!isRenewed} onClick={renewAdvertising}>
                    Renew
                </Button>
            </div>
        </div>
    );
}
 
export default HostItem;
