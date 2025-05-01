import ImgLogo from "@img/img-logo.png";
import styled from "styled-components";
import CustomButton from "@shared/ui/CustomButton.tsx";
import IcLoginBackground from "@icon/ic-login-background.svg";
import { useNavigate } from "react-router-dom";

export const OnboardingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <OnboardingContainer>
      <img src={ImgLogo} alt="" />
      <p>자립을 향한 한 걸음, 함께 뛰는 친구</p>
      <BottomContainer>
        <CustomButton label="로그인" isValid={true} onClick={handleLogin} />
        <p onClick={handleSignUp}>10초만에 회원가입</p>
      </BottomContainer>
      <Background src={IcLoginBackground} />
    </OnboardingContainer>
  );
};

const OnboardingContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: white;
  overflow-y: auto;
  overflow-x: hidden;

  img:first-child {
    margin: 30% 15% 0 15%;
  }

  p {
    margin-top: 10px;
    text-align: center;
    font: ${({ theme }) => theme.fonts.body_m_18px};
  }

  p:last-child {
    font: ${({ theme }) => theme.fonts.body_m_12px};
  }
`;

const BottomContainer = styled.div`
  position: absolute;
  padding: 0 16px;
  bottom: 10%;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: auto;
`;

const Background = styled.img`
  margin-top: 10%;
  height: 100%;
  width: 100%;
  object-fit: cover;
  pointer-events: none;
`;
