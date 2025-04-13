import styled from 'styled-components';
import GoalProgressbar from "@mission/components/GoalProgressbar.tsx";
import GoalList from "@mission/components/GoalList.tsx";

const CurrentGoal = () => {
  /*const { data, isPending } = useQuery({
    queryKey: ['currentGoal'],
    queryFn: () => getAreaHome(),
  });*/

  /*if (isPending) {
    return <Loading />;
  }*/

  /*const title =
    data!!.progressAreaType !== 'ALL'
      ? `${AreaType[data!!.progressAreaType]}기술 마스터하기`
      : '모든 기술 마스터!!!';*/

  return (
    <>
      <GoalContainer>
        <ContentContainer>
          <CurrentGoalLabel>현재 목표</CurrentGoalLabel>
          <GoalTitle>{'일상생활기술 마스터하기'}</GoalTitle>
        </ContentContainer>
        <ProgressbarContainer>
          <GoalProgressbar value={100} />
        </ProgressbarContainer>
      </GoalContainer>
      <MissionListText>자립목표 리스트</MissionListText>
      <GoalList
        enabled={false}
        init={false}
        currentAreaType={''}
      />
    </>
  );
};

export default CurrentGoal;

const GoalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 480px;
  height: 86px;
  border-radius: 31px;
  border: none;
  background-color: white;
  padding: 18px 26px 18px 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CurrentGoalLabel = styled.div`
  font: ${({ theme }) => theme.fonts.body_m_16px};
  color: ${({ theme }) => theme.colors.gray900};
`;

const GoalTitle = styled.div`
  font: ${({ theme }) => theme.fonts.body_sb_18px};
  color: ${({ theme }) => theme.colors.primary};
`;

const ProgressbarContainer = styled.div`
  display: flex;
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: flex-end; /* 수평 끝으로 정렬 */
  width: 80px; /* 적절한 너비를 설정하여 공간 확보 */
`;

const MissionListText = styled.div`
  font: ${({ theme }) => theme.fonts.body_sb_18px};
  color: ${({ theme }) => theme.colors.gray900};
  padding-left: 8px;
  padding-top: 34px;
  padding-bottom: 14px;
`;
