import { CommentType } from "@/types";
import { create } from "zustand";


interface HostAddModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    setUserId: (id: string | null) => void
    user_id: string | null
    comments: CommentType[] | null
    setComments: (comments: CommentType[]) => void
}

// host add modal
// isOpen is false by default
// onOpen set isOpen to true
// onClose set isOpen to false
const useHostAddModal = create<HostAddModalStore>((set) => ({
    isOpen: false,
    user_id: null,
    comments: null,
    setUserId: (id: string | null) => set({ user_id: id }),
    setComments: (comments: CommentType[]) => set({ comments: comments }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false, user_id: null, comments: null })
}))

export default useHostAddModal
