import styled from 'styled-components';
import GoalProgressbar from "@mission/components/GoalProgressbar.tsx";
import GoalList from "@mission/components/GoalList.tsx";
import { useGetCurrentArea } from "@mission/feature/hooks/query/useGetCurrentArea.ts";
import { AreaType } from "@shared/types/area.ts";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useUserInfoStore } from "@shared/store/useUserInfoStore.ts";

const CurrentGoal = () => {
  const { data, isPending, isError, isSuccess } = useGetCurrentArea();
  const { setCurrentArea } = useUserInfoStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && data?.selectedMissionType) {
      setCurrentArea(data?.selectedMissionType);
    }
  }, [data?.selectedMissionType, isSuccess, setCurrentArea]);

  if (isPending || !data) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error loading data</>;
  }

  const title =
    data?.selectedMissionType
      ? `${AreaType[data.selectedMissionType]}기술 마스터하기`
      : '모든 기술 마스터!!!';

  if (data.progress === 100) {
    navigate('/goal')
  }
  return (
    <>
      <GoalContainer>
        <ContentContainer>
          <CurrentGoalLabel>현재 목표</CurrentGoalLabel>
          <GoalTitle>{title}</GoalTitle>
        </ContentContainer>
        <ProgressbarContainer>
          <GoalProgressbar value={data.progress} />
        </ProgressbarContainer>
      </GoalContainer>
      <MissionListText>자립목표 리스트</MissionListText>
      <GoalList
        enabled={false}
        init={false}
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
