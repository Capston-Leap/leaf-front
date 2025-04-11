import styled from 'styled-components';
import { useState } from 'react';

interface MissionProps {
  id: number;
  missionType: string;
  missionName: string;
  /*isComplete: boolean;*/
  /*mission: OnGoingMission | undefined;*/
}

const MissionCard = ({ id, missionType, missionName }: MissionProps) => {
  /*const navigate = useNavigate();*/
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  /*const label = isComplete ? '완료' : '완료하기';*/

  /*const handleNavigateDetailPage = () => {
    navigate(`${navigations.MISSION_COMPLETE_DETAIL}/${id}`, { state: { missionName } });
  };*/

  // 버튼 클릭: Bottom Sheet 열기
  const handleNavigateWritePage = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 클릭 이벤트 중단
    setOpenBottomSheet(true);
  };

  // Bottom Sheet 닫기
  const handleCloseBottomSheet = () => {
    setOpenBottomSheet(false);
  };
  return (
    <>
      <MissionContainer onClick={() => {/*isComplete ? handleNavigateDetailPage : handleOpen*/}}>
        {/*{open && <GuideModal handleClose={handleClose} mission={mission!!} />}*/}
        <MissionType>{missionType}</MissionType>
        <MissionTitle>{missionName}</MissionTitle>
        {/*<ButtonContainer>
          <CardButton isDisabled={isComplete} label={label} onClick={handleNavigateWritePage} />
        </ButtonContainer>*/}
      </MissionContainer>

      {/*<CompleteBottomSheet
        isOpen={openBottomSheet}
        missionId={id}
        onClose={handleCloseBottomSheet}
      />*/}
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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-content: flex-end;
`;
