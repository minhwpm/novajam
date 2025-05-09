import { create } from 'zustand';

type BlogStore = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const useStore = create<BlogStore>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
