import { create } from "zustand";

export const useNavbar = create((set) => ({
  isSidebarOpen: false,
  handleSidebarToggle: () => {
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    }));
  },
}));
