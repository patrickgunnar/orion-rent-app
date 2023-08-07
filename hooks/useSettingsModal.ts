import { create } from "zustand";


interface SettingsModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

// sttings modal
// isOpen is false by default
// onOpen set isOpen to true
// onClose set isOpen to false
const useSettingsModal = create<SettingsModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useSettingsModal
