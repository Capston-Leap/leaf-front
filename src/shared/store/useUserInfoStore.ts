import { create } from "zustand";

export interface UserInfoStore {
  userName: string;
  leapyType: string;
  setUserName: (userName: string) => void;
  setLeapyType: (leapyType: string) => void;
}

export const useUserInfoStore = create<UserInfoStore>((set) => ({
  userName: "",
  leapyType: "",
  setUserName: (userName: string) => set({ userName }),
  setLeapyType: (leapyType: string) => set({ leapyType }),
}));
