import styled from 'styled-components';
import GuideModal from "@mission/components/GuideModal.tsx";
import { useHandleModal } from "@mission/feature/hooks/custom/useHandleModal.ts";
import { AreaType } from "@shared/types/area.ts";
import { useNavigate } from "react-router";

interface MissionProps {
  id: number;
  missionType: string;
  missionName: string;
  missionRecordId?: number;
  tabType: 'onGoing' | 'completed';
  /*isComplete: boolean;*/
  /*mission: OnGoingMission | undefined;*/
}

const MissionCard = ({ id, missionType, missionName, missionRecordId, tabType }: MissionProps) => {
  const navigate = useNavigate();
  const { open, handleOpen } = useHandleModal();
  const formatedMissionType = AreaType[missionType];

  /*const label = isComplete ? '완료' : '완료하기';*/

  /*const handleNavigateDetailPage = () => {
    navigate(`${navigations.MISSION_COMPLETE_DETAIL}/${id}`, { state: { missionName } });
  };*/

  return (
    <>
      <MissionContainer
        onClick={tabType === "onGoing" ? handleOpen : () => navigate(`/mission/complete/${missionRecordId}`, { state: { missionName } })}>
        <MissionType>{formatedMissionType}</MissionType>
        <MissionTitle>{missionName}</MissionTitle>
        {/*<ButtonContainer>
          <CardButton isDisabled={isComplete} label={label} onClick={handleNavigateWritePage} />
        </ButtonContainer>*/}
      </MissionContainer>

      {(open && tabType !== 'completed') &&
        <GuideModal handleClose={handleOpen} missionId={id} missionRecordId={missionRecordId!} />}
    </>
  );
};

export default MissionCard;

const MissionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  height: 112px;
  border-radius: 30px;
  border: none;
  background-color: white;
  padding: 20px 24px 16px 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const MissionType = styled.div`
  font: ${({ theme }) => theme.fonts.body_m_14px};
  color: ${({ theme }) => theme.colors.gray500};
`;

const MissionTitle = styled.div`
  font: ${({ theme }) => theme.fonts.body_sb_18px};
  color: ${({ theme }) => theme.colors.gray900};
`;

/*const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-content: flex-end;
`;*/
