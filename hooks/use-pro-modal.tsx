import { create } from "zustand";

interface useProModalStore {
  isOpen: boolean;
  open: () => void;
  onClose: () => void;
}

export const useProModal = create<useProModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
