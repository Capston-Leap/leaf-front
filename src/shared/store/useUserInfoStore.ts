import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserInfoStore {
  userName: string;
  leapyType: string;
  currentArea: string;
  setUserName: (userName: string) => void;
  setLeapyType: (leapyType: string) => void;
  setCurrentArea: (currentArea: string) => void;
}

export const useUserInfoStore = create<UserInfoStore>()(
  persist(
    (set) => ({
      userName: '',
      leapyType: '',
      currentArea: '',
      email: '',
      setUserName: (userName: string) => set({ userName }),
      setLeapyType: (leapyType: string) => set({ leapyType }),
      setCurrentArea: (currentArea: string) => set({ currentArea }),
    }),
    {
      name: 'user-info-storage', // localStorage에 저장될 key
      // storage 옵션도 설정 가능 (예: sessionStorage 사용 시)
      // storage: createJSONStorage(() => sessionStorage)
    }
  )
);
