import { create } from "zustand";


interface CommentModalStore {
    isOpen: boolean
    property_id: string | null
    user_id: string | null
    comment: string | null
    stars: number | null
    rate_id: string | null
    setPropertyId: (id: string | null) => void
    setUserId: (id: string | null) => void
    setComment: (comment: string | null) => void
    setStars: (stars: number) => void
    setRateId: (id: string | null) => void
    onOpen: () => void
    onClose: () => void
}

// comment modal
// isOpen is false by default
// onOpen set isOpen to true
// onClose set isOpen to false
const useCommentModal = create<CommentModalStore>((set) => ({
    isOpen: false,
    property_id: null,
    user_id: null,
    comment: null,
    stars: null,
    rate_id: null,
    setPropertyId: (id: string | null) => set({ property_id: id }),
    setUserId: (id: string | null) => set({ user_id: id }),
    setComment: (comment: string | null) => set({ comment: comment}),
    setStars: (stars: number) => set({ stars: stars }),
    setRateId: (id: string | null) => set({ rate_id: id }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false, property_id: null, user_id: null, comment: null, stars: null, rate_id: null })
}))

export default useCommentModal
