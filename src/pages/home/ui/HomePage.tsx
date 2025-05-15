import styled, { keyframes } from 'styled-components';
import ImgHomeBg from '@img/img-home-bg.png';
import { useNavigate } from "react-router-dom";
import MissionInfo from "@home/compoenets/MissionInfo.tsx";
import ChatIcon from "@icon/ic-chat-icon.tsx";
import PolygonSvg from "@icon/ic-polygon.svg";
import NavBar from "@shared/ui/NavBar.tsx";
import IcChatIntro from "@icon/ic-chat-intro.tsx";
import SupportCard from "@home/compoenets/SupportCard.tsx";
import { useGetHomeInfo } from "@home/feature/hooks/query/useGetHomeInfo.ts";
import { useManageSentence } from "@home/feature/hooks/custom/useManageSentence.ts";
import { Support } from "@home/feature/type/support.ts";
import { useUserInfo } from "@shared/hooks/query/useUserInfo.ts";
import { LeapyType } from "@shared/types/response/chat.ts";

export function HomePage() {
  const { data, isLoading, isError } = useGetHomeInfo();
  const { data: userInfo, isLoading: isLoadingUserInfo } = useUserInfo();
  const { sentenceIndex, handleNextSentence, SentenceSet } = useManageSentence();
  const navigate = useNavigate();

  const navigateChatbot = () => {
    navigate('/chat');
  };

  if (isLoading || isLoadingUserInfo || !data || !userInfo) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  if (userInfo && data) {
    if (userInfo?.chatbotType === null && userInfo?.missionType === null) {
      navigate('/onboarding');
    } else if ((userInfo?.chatbotType !== null && userInfo?.missionType === null) || data.progress === 100) {
      navigate('/goal');
    }
  }

  const supportType = Support[data.info.infoType] ? Support[data.info.infoType] : "기타";

  return (
    <Wrapper>
      <ContentContainer>
        {/* 미션관리, 챗봇 버튼 영역 */}
        <HeaderSection>
          <MissionInfo
            nickname={data?.nickname}
            level={data?.level}
            missionProPer={data.progress}
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
            <img src={LeapyType[userInfo?.chatbotType]} alt="" />
          </ImgContainer>
          <button className="name-wrapper">리피</button>
        </CharacterSection>
        <MissionContainer onClick={() => navigate('/support')}>
          {/* 지원제도 카드 */}
          <SupportCard supportType={supportType} supportTitle={data.info.infoTitle}
                       supportSubTitle={data.info.infoContent} link={data.info.infoUrl} />
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
