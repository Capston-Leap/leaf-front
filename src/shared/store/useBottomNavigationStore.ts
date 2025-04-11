import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum ActiveIndex {
  HOME = 1,
  MISSION = 2,
  COMMUNITY = 3,
  MY = 4,
}

interface UseBottomNavigationStore {
  activeIndex: ActiveIndex;
  setActiveIndex: (index: number) => void;
}

export const useBottomNavigationStore = create<UseBottomNavigationStore>()(
  persist(
    (set) => ({
      activeIndex: ActiveIndex.HOME,
      setActiveIndex: (activeIndex: ActiveIndex) => set({ activeIndex }),
    }),
    {
      name: 'bottom-navigation-storage',
    },
  ),
);
