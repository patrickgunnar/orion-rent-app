import { create } from "zustand";


interface ChatModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

// chat modal
// isOpen is false by default
// onOpen set isOpen to true
// onClose set isOpen to false
const useChatModal = create<ChatModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useChatModal
