import { create } from "zustand";


interface AboutModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

// about modal
// isOpen is false by default
// onOpen set isOpen to true
// onClose set isOpen to false
const useAboutModal = create<AboutModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useAboutModal
