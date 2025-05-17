import styled from 'styled-components';
import Record from './Record.tsx';
import { useParams } from 'react-router-dom';
import { useGetRecordDetail } from "@mission/feature/hooks/query/useGetRecordDetail.ts";

const RecordDetail = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const { data, isLoading, isError} = useGetRecordDetail(parseInt(missionId!));

  if (isLoading || !data) return <div>Loading...</div>;
  if (isError) return <div>Error loading record details</div>;

  return (
    <RecordDetailContainer>
      <Record title='어떤 미션을 수행했나요?' content={data?.content} />
      <div style={{ height: '1px', backgroundColor: '#E5E5E5' }} />
      <Record title='수행 후 어떤 기분이 들었나요?' content={data?.emotion} />
    </RecordDetailContainer>
  );
};

export default RecordDetail;

const RecordDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow-y: auto;
`;

