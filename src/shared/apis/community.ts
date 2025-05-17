// src/shared/apis/community.ts
import { axiosInstance } from "@shared/apis/axios-instance.ts";
import { AxiosResponse } from "axios";

export const fetchAllPosts = async (communityId: number, page = 1, size = 10) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(`/community/${communityId}`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return { content: [] };
  }
};

export const fetchMyPosts = async (
  communityId: number,
  page = 1,
  size = 10
) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(`/community/${communityId}/mypost`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching my posts:", error);
  }
};

export const getPostDetail = async (
  communityId: number,
  postId: number,
  page = 1,
  size = 10
) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(`/community/${communityId}/${postId}`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching post detail:", error);
  }
};

export const createPost = async (
  communityId: number,
  title: string,
  content: string
) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(`/community/${communityId}`, {
      title,
      content,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

export const updatePost = async (
  communityId: number,
  postId: number,
  title: string,
  content: string
) => {
  try {
    const response: AxiosResponse = await axiosInstance.patch(
      `/community/${communityId}/${postId}`,
      { title, content }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
  }
};

export const deletePost = async (communityId: number, postId: number) => {
  try {
    const response: AxiosResponse = await axiosInstance.delete(
      `/community/${communityId}/${postId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};
