import { create } from "zustand";


interface SearchModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

// search modal
// isOpen is false by default
// onOpen set isOpen to true
// onClose set isOpen to false
const useSeachModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useSeachModal
