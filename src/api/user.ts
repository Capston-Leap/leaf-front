import axios from "axios";

const BASE_URL = "http://ceprj.gachon.ac.kr:60013";

// ✅ 전역 axios 인스턴스 설정
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 인터셉터로 자동 토큰 주입
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const logoutUser = async () => {
  const response = await axiosInstance.post("/user/logout");
  if (response.status !== 204) throw new Error("로그아웃 실패");
};

export const deleteUser = async () => {
  const response = await axiosInstance.delete("/user");
  if (response.status !== 204) throw new Error("회원탈퇴 실패");
};

export const fetchUserProfile = async () => {
  const response = await axiosInstance.get("/user/profile");
  return response.data;
};
