export interface Info {
  infoId: number;
  infoType: string;
  infoTitle: string;
  infoContent: string;
  infoUrl: string;
}

export interface InformationListResponse {
  responseList: Info[];
  pageNumber: number;
  pageSize: number;
  hasNext: boolean;
}
