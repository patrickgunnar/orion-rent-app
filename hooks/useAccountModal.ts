import { create } from "zustand";


interface AccountModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

// account modal
// isOpen is false by default
// onOpen set isOpen to true
// onClose set isOpen to false
const useAccountModal = create<AccountModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useAccountModal
