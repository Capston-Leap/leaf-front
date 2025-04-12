import styled from 'styled-components';
import guideSlime from '@img/guide-slime.png';
import cancel from '@icon/ic-cancel.svg';
import CustomButton from "@shared/ui/CustomButton.tsx";
import { useNavigate } from "react-router";

interface GuideModalProps {
  handleClose: () => void;
  /*mission?: OnGoingMission;*/
}

const GuideModal = ({ handleClose }: GuideModalProps) => {
  const navigate = useNavigate();

  const navigateWrite = () => {
    navigate('record');
    handleClose();
  }

  return (
    <Overlay>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CancelIcon src={cancel} onClick={handleClose} />
        <MissionName>{'3일 동안의 식단 작성하기'}</MissionName>
        <Description>{'식단표를 계획할 때 영양성분을 고려하여 다양한 식품을 포함시키는 방법을 익히기'}</Description>
        {/*<Divider color={theme.colors.gray100}/>*/}
        <ImageContainer>
          <Image src={guideSlime} />
          <SlimeComment>단계별로 수행 방법을 알려줄게</SlimeComment>
        </ImageContainer>
        <StepContainer>
          <StepContent key={1}>
            <Number>{1}</Number>
            <Step>{'영양성분을 고려하여 다양한 종류의 채소, 단배질, 탄수화물을 포함시킨다.'}</Step>
          </StepContent>
          <StepContent key={2}>
            <Number>{2}</Number>
            <Step>{'식품의 영양성분을 확인하는 방법을 학습하고, 주간 식단표에 적용해본다.'}</Step>
          </StepContent>
          {/*{mission?.steps.map((step, index) => (
            <StepContent key={index}>
              <Number>{index + 1}</Number>
              <Step>{step}</Step>
            </StepContent>
          ))}*/}
        </StepContainer>
        <CustomButton onClick={navigateWrite} label="완료하기" isValid={true}  />
      </ModalContainer>
    </Overlay>
  );
};

export default GuideModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 50%; /* X축 기준으로 가운데 정렬 */
  transform: translateX(-50%); /* X축 정렬을 위해 사용 */
  width: 100vw;
  height: 100vh;
  z-index: 100;
  max-width: 480px;
  background: rgba(0, 0, 0, 0.4);
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  margin: 0 16px;
  border-radius: 30px;
  border: none;
  background-color: white;

  &:focus-visible {
    outline: none
  }

,
`;

const MissionName = styled.div`
  width: 210px;
  font: ${({ theme }) => theme.fonts.heading_sb_20px};
  color: ${({ theme }) => theme.colors.gray900};
  text-align: center;

  margin: 12px auto auto;
`;

const Description = styled.div`
  font: ${({ theme }) => theme.fonts.body_m_14px};
  color: ${({ theme }) => theme.colors.gray900};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.gray100};
  padding: 18px 52px;
  margin-top: 15px;
  border: none;
  border-radius: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 9px;
`;

const Image = styled.img`
  width: 85px;
  height: 85px;
`;

const SlimeComment = styled.div`
  font: ${({ theme }) => theme.fonts.body_m_14px};
  color: white;
  text-align: center;
  padding: 13px 20px;
  border: none;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.gray600};
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  margin-top: 27px;
  margin-bottom: 43px;
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 12px;
`;

const Number = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  padding: 3px 10px;
  margin-top: 3px;
  font: ${({ theme }) => theme.fonts.body_m_16px};
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const Step = styled.div`
  font: ${({ theme }) => theme.fonts.body_m_16px};
  color: ${({ theme }) => theme.colors.gray900};
`;

const CancelIcon = styled.img`
  position: absolute;
  top: 22px;
  right: 22px;
  width: 18px;
  height: 18px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 17.5px 0 17.5px 0;
  border-radius: 18px;
  margin-top: auto;
  font: ${({ theme }) => theme.fonts.body_sb_18px};
  color: white;
`;
