// src/shared/apis/comment.ts
import { axiosInstance } from "@shared/apis/axios-instance.ts";
import { AxiosResponse } from "axios";

export const createComment = async (
  communityId: number,
  postId: number,
  content: string
) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `/community/${communityId}/${postId}/comment`,
      { content }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
  }
};

export const deleteComment = async (
  communityId: number,
  postId: number,
  commentId: number
) => {
  try {
    const response: AxiosResponse = await axiosInstance.delete(
      `/community/${communityId}/${postId}/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};
