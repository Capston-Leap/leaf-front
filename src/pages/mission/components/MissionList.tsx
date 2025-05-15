import styled from 'styled-components';
import MissionCard from "@mission/components/MissionCard.tsx";
import { useGetMissionList } from "@mission/feature/hooks/query/useGetMissionList.ts";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface MissionListProps {
  type: 'onGoing' | 'completed';
}

const MissionList = ({ type }: MissionListProps) => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetMissionList(type.toUpperCase());
  const { ref, inView } = useInView();


  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <MissionListContainer>
      {data.pages.map((page) => (
        page?.missionList.map((mission) => (
          <MissionCard
            key={mission.missionId}
            id={mission.missionId}
            tabType={type}
            missionRecordId={mission.missionRecordId}
            missionType={mission.missionType}
            missionName={mission.title}
          />
        ))
      ))}
      <div ref={ref} />
      {data.pages?.length === 0 && (
        <NonMissionContainer>
          <NoneMissionText>아직 완료한 미션이 없어요!</NoneMissionText>
        </NonMissionContainer>
      )}
    </MissionListContainer>
  );
};

export default MissionList;

const MissionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  gap: 16px;
`;

const NoneMissionText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${({ theme }) => theme.fonts.body_sb_18px};
  color: ${({ theme }) => theme.colors.gray400};
`;

const NonMissionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

/*
const Image = styled.img`
  width: 120px;
  height: 96px;
  margin-top: 18px;
`;
*/
