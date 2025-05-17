import styled from 'styled-components';

interface RecordProps {
  title: string;
  content: string;
}

const Record = ({ title, content }: RecordProps) => {
  return (
    <RecordContainer>
      <RecordTitle>{title}</RecordTitle>
      <RecordContent>{content}</RecordContent>
    </RecordContainer>
  );
};

export default Record;

const RecordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  background-color: white;
`;

const RecordTitle = styled.div`
  margin-left: 8px;
  font: ${({ theme }) => theme.fonts.body_sb_18px};
  color: ${({ theme }) => theme.colors.gray900};
`;

const RecordContent = styled.div`
  font: ${({ theme }) => theme.fonts.body_m_16px};
  color: ${({ theme }) => theme.colors.gray900};
  padding: 18px;
  margin-top: 30px;
  height: 25vh;
  border: 2px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 28px;
  overflow: hidden;
  white-space: pre-wrap;
  word-break: break-word;
`;
