import styled from 'styled-components';
import BackToolbar from "@shared/ui/BackToolbar.tsx";
import DiaryDetail from "@diary/components/DiaryDetail.tsx";
import { useLocation } from "react-router";
import { useParams } from "react-router-dom";

export const DiaryDetailPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const { year, month, diaryId } = location.state as { year: number; month: number; diaryId: number; };

  return (
    <DiaryDetailContainer>
      <BackToolbar title={`${year}년 ${month + 1}월 ${id}일`} />
      <DiaryDetailInner>
        <DiaryDetail diaryId={diaryId} />
      </DiaryDetailInner>
    </DiaryDetailContainer>
  );
};

const DiaryDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  max-width: 480px;
  height: 100vh;
  background-color: white;
  overflow: hidden;
`;

const DiaryDetailInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 18px 0 18px;
  overflow-y: auto;
`;
