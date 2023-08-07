'use client'

import AboutModal from "@/components/modals/AboutModal";
import AccountModal from "@/components/modals/AccountModal";
import AddModal from "@/components/modals/AddModal";
import ChatModal from "@/components/modals/ChatModal";
import CommentModal from "@/components/modals/CommentModal";
import HostAddModal from "@/components/modals/HostAddModal";
import SearchModal from "@/components/modals/SearchModal";
import SettingsModal from "@/components/modals/SettingsModal";
import { useState, useEffect } from "react";


// modal provider
const ModalProvider = () => {
    // is mounted state
    const [isMounted, setIsmounted] = useState<boolean>(false)

    // set is mouted to true after mount
    useEffect(() => setIsmounted(true), [])

    // if not mounted
    if(!isMounted) return null

    // render modals
    // search modal
    // account modal
    // host add modal
    // settings modal
    // chat modal
    // add modal
    // comment modal
    // about modal
    return (
        <>
            <SearchModal />
            <AccountModal />
            <HostAddModal />
            <SettingsModal />
            <ChatModal />
            <AddModal />
            <CommentModal />
            <AboutModal />
        </>
    );
}
 
export default ModalProvider;
