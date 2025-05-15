import { axiosInstance } from "@shared/apis/axios-instance.ts";
import { AxiosResponse } from "axios";
import { InformationListResponse } from "@shared/types/response/support.ts";

export const fetchSupportInfo = async (page: number, size: number, category?: string) => {
  try {
    const response: AxiosResponse<InformationListResponse> = await axiosInstance.get('/information', {
      params: {
        category,
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching support information:', error);
    return undefined;
  }
}
