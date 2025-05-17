import styled from 'styled-components';
import BackToolbar from "@shared/ui/BackToolbar.tsx";
import DiaryWriteForm from "@diary/components/DiaryWriteForm.tsx";

export const DiaryWritePage = () => {
  return (
    <DiaryWriteContainer>
      <BackToolbar title='일기작성' />
      <DiaryWriteForm />
    </DiaryWriteContainer>
  );
};

const DiaryWriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  height: 100vh;
  background-color: white;
  overflow-y: hidden;
`;
