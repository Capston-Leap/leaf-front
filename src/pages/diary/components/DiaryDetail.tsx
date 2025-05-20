import styled from 'styled-components';
import Record from "@diary/components/Record.tsx";
import { useGetDiaryDetail } from "@diary/feature/hooks/query/useGetDiaryDetail.ts";
import { EmotionImages } from "@shared/types/response/diary.ts";
import EmotionChart from "@diary/components/EmotionChart.tsx";

interface DiaryDetailProps {
  diaryId: number;
}

const DiaryDetail = ({ diaryId }: DiaryDetailProps) => {
  const { data, isLoading, isError } = useGetDiaryDetail(diaryId);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <DiaryDetailContainer>
      <InnerContainer>
        <p className="bold-title">오늘의 감정</p>
        <img src={EmotionImages[data.category]} alt="" style={{ width: '13%' }} />
        <p className="detail-description">{data.summary}</p>
        <EmotionChart scores={data.emotionScores} />
      </InnerContainer>
      <Record title="오늘 어떤 하루를 보냈나요?" content={data.daily} />
      <Divider />
      <Record title="기억에 남는 일이 있었나요?" content={data.memory} />
    </DiaryDetailContainer>
  );
};

export default DiaryDetail;

const DiaryDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow-y: auto;
  padding-bottom: 30px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .bold-title {
    font: ${({ theme }) => theme.fonts.body_sb_18px};
    color: ${({ theme }) => theme.colors.gray900};
  }

  .detail-description {
    margin-top: 5px;
    white-space: pre-wrap;
    font: ${({ theme }) => theme.fonts.body_m_16px};
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray200};
  margin: 0 14px;
`;
