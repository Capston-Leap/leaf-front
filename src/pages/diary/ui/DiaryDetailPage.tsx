import styled from 'styled-components';
import BackToolbar from "@shared/ui/BackToolbar.tsx";
import DiaryDetail from "@diary/components/DiaryDetail.tsx";

export const DiaryDetailPage = () => {
  return (
    <DiaryDetailContainer>
      <BackToolbar title={"2025년 12월 23일"} />
      <DiaryDetailInner>
        <DiaryDetail />
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
