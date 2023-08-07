'use client'

import getHostPropertiesOnPropertyPage from "../actions/getHostPropertiesOnPropertyPage"
import Modal from "./Modal"
import useHostAddModal from "@/hooks/useHostAddModal"
import { useEffect, useState } from "react"
import { PropertyType } from "@/types"
import SettingsLoading from "../settings/SettingsLoading"
import HostAddBox from "@/app/listings/[listingId]/listing_content/HostAddBox"


// host add modal
const HostAddModal = () => {
    // use host add modal
    const hostAddModal = useHostAddModal()

    // use state to deal with host properties
    const [hostProperties, setHostProperties] = useState<PropertyType[] | null>(null)

    // get comments 
    const comments = hostAddModal.comments || []

    useEffect(() => {
        // get hostl properties
        const getHostProperties = async () => setHostProperties(
            await getHostPropertiesOnPropertyPage(hostAddModal.user_id, true)
        )

        if(hostAddModal.user_id) getHostProperties()
    }, [hostAddModal.user_id])

    // on change modal handler
    const onChangeHandler = (isOpen: boolean) => {
        // if modal is opened
        // close it
        if(isOpen) hostAddModal.onClose()
    }

    // render elements
    return (
        <Modal
            title="Advertisement"
            description="All the advertisements from the advertiser."
            isOpen={hostAddModal.isOpen}
            onChange={() => onChangeHandler(hostAddModal.isOpen)}>
            {
                hostProperties ? (
                    <HostAddBox currentProperties={hostProperties} comments={comments} />
                ) : (
                    <SettingsLoading />
                )
            }
        </Modal>
    );
}
 
export default HostAddModal;
