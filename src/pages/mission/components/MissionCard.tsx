import styled from 'styled-components';
import GuideModal from "@mission/components/GuideModal.tsx";
import { useHandleModal } from "@mission/feature/custom/useHandleModal.ts";

interface MissionProps {
  id: number;
  missionType: string;
  missionName: string;
  /*isComplete: boolean;*/
  /*mission: OnGoingMission | undefined;*/
}

const MissionCard = ({ id, missionType, missionName }: MissionProps) => {
  /*const navigate = useNavigate();*/
  const { open, handleOpen } = useHandleModal()
  console.log(open);

  /*const label = isComplete ? '완료' : '완료하기';*/

  /*const handleNavigateDetailPage = () => {
    navigate(`${navigations.MISSION_COMPLETE_DETAIL}/${id}`, { state: { missionName } });
  };*/

  return (
    <>
      <MissionContainer onClick={handleOpen}>
        <MissionType>{missionType}</MissionType>
        <MissionTitle>{missionName}</MissionTitle>
        {/*<ButtonContainer>
          <CardButton isDisabled={isComplete} label={label} onClick={handleNavigateWritePage} />
        </ButtonContainer>*/}
      </MissionContainer>

      {open && <GuideModal handleClose={handleOpen} />}
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
