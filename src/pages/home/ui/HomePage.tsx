import styled, { keyframes } from 'styled-components';
import ImgHomeBg from '@img/img-home-bg.png';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MissionInfo from "@home/compoenets/MissionInfo.tsx";
import ChatIcon from "@icon/ic-chat-icon.tsx";
import PolygonSvg from "@icon/ic-polygon.svg";
import NavBar from "@shared/ui/NavBar.tsx";
import LeafiMan from "@img/img-leafi-3.png";
import IcChatIntro from "@icon/ic-chat-intro.tsx";
import SupportCard from "@home/compoenets/SupportCard.tsx";

export function HomePage() {
  const navigate = useNavigate();
  const [sentenceIndex, setSentenceIndex] = useState(0); // 현재 문장 인덱스 관리

  const SentenceSet = [
    '오늘은 무슨 일 없었어?',
    '안녕! 오늘 기분은 어때?',
    '넌 정말 잘하고 있어!',
    '오늘 뭔가 재밌는 일이 있었을까?',
    '어떤 하루를 보냈는지 들려줄래?',
  ];

  const navigateChatbot = () => {
    navigate('/chat');
  };

  // 문장 변경 함수
  const handleNextSentence = () => {
    setSentenceIndex((prevIndex) => (prevIndex + 1) % SentenceSet.length); // 다음 문장으로 이동, 마지막 문장 후 처음으로
  };

  return (
    <Wrapper>
      <ContentContainer>
        {/* 미션관리, 챗봇 버튼 영역 */}
        <HeaderSection>
          <MissionInfo
            nickname="안뇽"
            level={3}
            missionProPer={80}
          />
          <InnerWrapper>
            <ChatBtn onClick={navigateChatbot}>
              <ChatIcon />
            </ChatBtn>
            <ChatIntroMsg />
          </InnerWrapper>
        </HeaderSection>
        {/* 캐릭터 영역 */}
        <CharacterWrapper />
        <CharacterSection>
          <button className="msg-wrapper" onClick={handleNextSentence}>
            {SentenceSet[sentenceIndex]}
          </button>
          <img src={PolygonSvg} alt="" />
          <ImgContainer>
            <img src={LeafiMan} alt="" />
          </ImgContainer>
          <button className="name-wrapper">리피</button>
        </CharacterSection>
        <MissionContainer onClick={() => navigate('/support')}>
          {/* 지원제도 카드 */}
          <SupportCard supportType="경제" supportTitle="청년 도약 계좌" supportSubTitle="만 19세~34세 이하" link="" />
        </MissionContainer>
      </ContentContainer>
      <NavBar />
    </Wrapper>
  );
}

const InnerWrapper = styled.div`
  position: absolute;
  top: 25%;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-end;
`;

const Wrapper = styled.div`
  width: 100vw;
  max-width: 440px;
  height: 100vh;

  display: flex;
  flex-direction: column;

  background-image: url(${ImgHomeBg});
  background-size: 100vw 100vh;
`;
const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 11px 16px 110px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderSection = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`;
const ChatBtn = styled.button`
  min-width: 55px;
  width: 55px;
  height: 55px;

  border-radius: 50%;
  background: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;
`;

// 사라지는 애니메이션 정의
const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

// 애니메이션이 적용된 ChatIntroSvg 스타일 정의
const ChatIntroMsg = styled(IcChatIntro)`
  animation: ${fadeOut} 1s ease-out 4s forwards; /* 4초 후 서서히 사라짐 */
`;

// 애니메이션 정의
const grow = keyframes`
  0% {
    width: 100px;
    height: 100px;
  }
  100% {
    width: 280px;
    height: 280px;
  }
`;
const CharacterWrapper = styled.div`
  position: absolute;
  top: 55%; /* 위치 조정 */
  left: 50%;
  transform: translate(-50%, -50%); /* 중앙 정렬 */

  background: rgba(255, 238, 171, 0.8);
  filter: blur(75px);
  border-radius: 50%;
  animation: ${grow} 2s infinite alternate; /* 애니메이션 설정 */
`;
// 스타일드 컴포넌트 정의
const ImgContainer = styled.div`
  position: relative;
  margin-bottom: -5px;

  > img {
    height: 250px;
  }
`;

const CharacterSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  z-index: 20;

  .msg-wrapper {
    padding: 16px 34px;
    margin-bottom: 5px;
    height: 57px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(15px);
    border-radius: 35px;

    ${({ theme }) => theme.fonts.body_m_18px};
    color: ${({ theme }) => theme.colors.gray900};

    white-space: pre-line; /* 줄바꿈을 반영 */
    text-align: center; /* 중앙 정렬 */
  }

  .name-wrapper {
    padding: 0 26px;

    height: 35px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(9.83607px);
    border-radius: 22.9508px;

    ${({ theme }) => theme.fonts.body_m_14px};
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const MissionContainer = styled.div`
  position: absolute;
  bottom: 112px;
  width: 100%;
  padding: 0 16px;
`;
