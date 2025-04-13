import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import BackToolbar from "@shared/ui/BackToolbar.tsx";
import CustomButton from "@shared/ui/CustomButton.tsx";
import ConfirmContent from "@mission/components/ConfirmContent.tsx";

export const GoalSelectConfirmPage = () => {
  const location = useLocation();
  const { image, type } = location.state.goal || {};

  const navigate = useNavigate();

  /*const [searchParams] = useSearchParams();
  const initStatus = searchParams.get('init') === 'true';*/

 /* const handleNavigate = async () => {
    console.log(initStatus);
    //영역 생성 api 호출
    const res = await createInitGoal(accessToken!, type);
    console.log(res);
    //성공 시
    if (res && res.id) {
      if (initStatus) {
        //첫 영역 생성일 경우
        navigate('/initial-setup?step=3', {
          state: {
            type: type,
            id: res.id,
          },
        });
      } else {
        navigate(navigations.GOAL_PRE_CHECK, {
          state: {
            type: type,
            id: res.id,
          },
        });
      }
    }
  };*/
  return (
    <MissionCompletionContainer>
      <BackToolbar title=' ' />
      <ContentContainer>
        <ConfirmContent goalType={type} image={image} />
      </ContentContainer>
      <ButtonContainer>
        <CustomButton label='네' isValid={true} onClick={() => navigate('/home')} />
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
