import { create } from "zustand";


interface AddModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

// add modal
// isOpen is false by default
// onOpen set isOpen to true
// onClose set isOpen to false
const useAddModal = create<AddModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useAddModal
