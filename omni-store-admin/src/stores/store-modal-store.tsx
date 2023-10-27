import { create } from "zustand"

interface StoreModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const storeModalStore = create<StoreModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))