import { create } from 'zustand';

interface IState {
  hideLoading: () => void;
  isLoading: boolean;
  showLoading: () => void;
}

export const useLoadingStore = create<IState>((set) => ({
  hideLoading: () => set({ isLoading: false }),
  isLoading: false,
  showLoading: () => set({ isLoading: true }),
}));
