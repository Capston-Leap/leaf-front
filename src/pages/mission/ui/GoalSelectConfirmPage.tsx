import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import BackToolbar from "@shared/ui/BackToolbar.tsx";
import CustomButton from "@shared/ui/CustomButton.tsx";
import ConfirmContent from "@mission/components/ConfirmContent.tsx";
import { usePatchMissionArea } from "@shared/hooks/mutate/usePatchMissionArea.ts";
import { MissionAreaSettingRequest } from "@shared/types/request/mission.ts";
import { useUserInfoStore } from "@shared/store/useUserInfoStore.ts";

export const GoalSelectConfirmPage = () => {
  const location = useLocation();
  const { setCurrentArea } = useUserInfoStore();
  const { image, type } = location.state.goal || {};
  const { mutate } = usePatchMissionArea()
  console.log(type)
  const request: MissionAreaSettingRequest = {
    missionType: type,
  }

  const onClickButton = () => {
    setCurrentArea(type);
    mutate(request);
  }

  return (
    <MissionCompletionContainer>
      <BackToolbar title=' ' />
      <ContentContainer>
        <ConfirmContent goalType={type} image={image} />
      </ContentContainer>
      <ButtonContainer>
        <CustomButton label='네' isValid={true} onClick={onClickButton} />
      </ButtonContainer>
    </MissionCompletionContainer>
  );
};

const MissionCompletionContainer = styled.div`
  position: relative;
  padding: 13px 0 32px 0;
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  max-width: 480px;
  height: 100vh;
  background-color: white;
`;

const ContentContainer = styled.div`
  display: flex;
  margin-top: 74px;
  padding: 0 16px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  margin-bottom: 32px;
  padding: 0 16px 0 16px;
  justify-content: center; /* 버튼 가운데 정렬 */
`;
