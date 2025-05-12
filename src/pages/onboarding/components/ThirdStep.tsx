import CustomButton from "@shared/ui/CustomButton.tsx";
import styled, { keyframes } from "styled-components";
import ManLeafi from '@img/img-man-leafi.png'

interface ThirdStepProps {
  handleNext: () => void;
}

const ThirdStep = ({ handleNext }: ThirdStepProps) => {
  return (
    <Wrapper>
      <ContentContainer>
        <p>'쨘! 리피가 생성되었어요!'</p>
        <ImgWrapper />
        <img src={ManLeafi} />
      </ContentContainer>
      <CustomButton label="다음" onClick={handleNext} isValid={true} marginTop="auto" />
    </Wrapper>
  );
};

export default ThirdStep;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 애니메이션 정의
const grow = keyframes`
  0% {
    width: 150px;
    height: 150px;
  }
  100% {
    width: 270px;
    height: 270px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 16px 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 56px;

  > p {
    ${({ theme }) => theme.fonts.heading_sb_24px};
    color: ${({ theme }) => theme.colors.gray900};
    white-space: pre-line; /* 줄바꿈을 반영 */
    text-align: center; /* 중앙 정렬 */
  }

  > img {
    position: absolute;
    top: 55%; /* 위치 조정 */
    left: 50%;
    transform: translate(-50%, -50%); /* 중앙 정렬 */
  }
`;

// 스타일드 컴포넌트 정의
const ImgWrapper = styled.div`
  position: absolute;
  top: 55%; /* 위치 조정 */
  left: 50%;
  transform: translate(-50%, -50%); /* 중앙 정렬 */

  background: rgba(255, 238, 171, 0.8);
  filter: blur(75px);
  border-radius: 50%;
  animation: ${grow} 2s infinite alternate; /* 애니메이션 설정 */
`;
