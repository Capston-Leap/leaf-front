import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import BackToolbar from "@shared/ui/BackToolbar.tsx";
import RecordDetail from "@mission/components/RecordDetail.tsx";

export const MissionCompleteDetailPage = () => {
  const { missionName } = useLocation().state;
  console.log(missionName);
  return (
    <MissionCompleteDetailContainer>
      <BackToolbar title="수행일지" />
      <RecordDetailContainer>
        <MissionTitle>{missionName}</MissionTitle>
        <RecordDetail />
      </RecordDetailContainer>
    </MissionCompleteDetailContainer>
  );
};

const MissionCompleteDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  max-width: 480px;
  height: 100vh;
  background-color: white;
  overflow: hidden;
`;

const RecordDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 18px 0 18px;
  overflow: auto;
`;

const MissionTitle = styled.p `
  font: ${({ theme }) => theme.fonts.heading_sb_24px};
  color: ${({ theme }) => theme.colors.gray900};
  margin-left: 4px;
  margin-bottom: 30px;
`
