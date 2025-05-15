import styled from 'styled-components';
import Record from "@diary/components/Record.tsx";
import { emotion } from "@diary/feature/mocks/emotion.ts";

const DiaryDetail = () => {
  /*const { missionId } = useParams<{ missionId: string }>();*/
  /*const { data, mutate, isPending } = useMutation({
    mutationKey: ['missionRecord', missionId],
    mutationFn: (missionId: string) => postBuddyFeedback(missionId),
  });*/

  return (
    <DiaryDetailContainer>
      <InnerContainer>
        <p className="bold-title">오늘의 감정</p>
        <img src={emotion[1].img} alt="" style={{ width: '13%' }} />
        <p className="detail-description">오늘은 슬프고 눈물나는 하루를 보내셨네요 ㅠㅠ</p>
      </InnerContainer>
      <Record title="오늘 어떤 하루를 보냈나요?" content={""} />
      <Divider />
      <Record title="기억에 남는 일이 있었나요?" content={""} />
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
    min-height: 10vh;
    font: ${({ theme }) => theme.fonts.body_m_16px};
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray200};
  margin: 0 14px;
`;
