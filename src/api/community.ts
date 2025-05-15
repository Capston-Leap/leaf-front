// src/api/community.ts
import axios from "axios";

const BASE_URL = "http://ceprj.gachon.ac.kr:60013";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 토큰 자동 삽입
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 게시글 전체 조회
export const fetchAllPosts = async (
  communityId: number,
  page: number = 1,
  size: number = 10
) => {
  const response = await axiosInstance.get(`/community/${communityId}`, {
    params: { page, size },
  });
  return response.data;
};

// 내가 작성한 게시글 조회
export const fetchMyPosts = async (
  communityId: number,
  page: number = 1,
  size: number = 10
) => {
  const response = await axiosInstance.get(
    `/community/${communityId}/mypost`,
    {
      params: { page, size },
    }
  );
  return response.data;
};

// 게시글 삭제
export const deletePost = async (communityId: number, postId: number) => {
  const response = await axiosInstance.delete(
    `/community/${communityId}/${postId}`
  );
  return response.data;
};

// 게시글 수정
export const updatePost = async (
  communityId: number,
  postId: number,
  title: string,
  content: string
) => {
  const response = await axiosInstance.patch(
    `/community/${communityId}/${postId}`,
    { title, content }
  );
  return response.data;
};

export const createPost = async (
  communityId: number,
  title: string,
  content: string
) => {
  const response = await axiosInstance.post(`/community/${communityId}`, {
    title,
    content,
  });
  return response.data;
};

export const getPostDetail = async (
  communityId: number,
  postId: number,
  page: number = 1,
  size: number = 10
) => {
  const response = await axiosInstance.get(`/community/${communityId}/${postId}`, {
    params: { page, size }
  });
  return response.data;
};

