// src/api/comment.ts
import axios from "axios";

const BASE_URL = "http://ceprj.gachon.ac.kr:60013";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createComment = async (
  communityId: number,
  postId: number,
  content: string
) => {
  const response = await axiosInstance.post(
    `/community/${communityId}/${postId}/comment`,
    { content }
  );
  return response.data;
};

export const deleteComment = async (
  communityId: number,
  postId: number,
  commentId: number
) => {
  const response = await axiosInstance.delete(
    `/community/${communityId}/${postId}/comment/${commentId}`
  );
  return response.data;
};
