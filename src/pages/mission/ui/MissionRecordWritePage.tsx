import styled from 'styled-components';
import RecordWriteForm from "@mission/components/RecordWriteForm.tsx";
import BackToolbar from "@shared/ui/BackToolbar.tsx";

export const MissionRecordWritePage = () => {
  return (
    <MissionRecordWriteContainer>
      <BackToolbar title='수행일지' />
      <RecordWriteForm />
    </MissionRecordWriteContainer>
  );
};

const MissionRecordWriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  height: 100vh;
  background-color: white;
  overflow-y: hidden;
`;
