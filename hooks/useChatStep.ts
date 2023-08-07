import { create } from "zustand";


interface HostDetailsStore {
    full_name: string
    avatar_url: string
    id: string
}

interface ChatStepStore {
    step: number
    host_details: HostDetailsStore | null
    setStep: (step: number) => void
    setHostDetails: (details: HostDetailsStore | null) => void
}

const useChatStep = create<ChatStepStore>((set) => ({
    step: 0,
    host_details: null,
    setStep: (step: number) => set({ step: step }),
    setHostDetails: (details: HostDetailsStore | null) => set({ host_details: details })
}))

export default useChatStep
