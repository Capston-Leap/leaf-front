import styled from 'styled-components';
import BackToolbar from "@shared/ui/BackToolbar.tsx";
import ChatRoom from "@chat/components/ChatRoom.tsx";
import chatbotBottomBg from '@img/img-chat-bg.png';
import { useUserInfo } from "@shared/hooks/query/useUserInfo.ts";
import { useUserInfoStore } from "@shared/store/useUserInfoStore.ts";
import { useEffect } from "react";
import { LeapyType } from "@shared/types/response/chat.ts";

const ChatbotPage = () => {
  const { data, isLoading, isError } = useUserInfo();
  const { setUserName, setLeapyType, leapyType } = useUserInfoStore();

  useEffect(() => {
    if (!data?.name) return;
    setUserName(data.name);
    setLeapyType(data.chatbotType);

  }, [data?.chatbotType, data?.name, setLeapyType, setUserName]);

  if (isLoading || !data) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <ChatbotContainer>
      <BackToolbar title="리피" isWhite={true} />
      <BackgroundImage src={chatbotBottomBg} />
      <ChatbotImage src={LeapyType[leapyType]} alt='chatbot' />
      <ChatRoom />
    </ChatbotContainer>
  );
};

export default ChatbotPage;

const ChatbotContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    #59D9CC 0%,
    #E0FFFC 47%,
    #fff 100%
  );
    /*background-color: ${({ theme }) => theme.colors.gray100};*/
`;

const BackgroundImage = styled.img`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const ChatbotImage = styled.img`
  position: absolute;
  height: 30%;
  bottom: 140px; /* 하단에서 100px 위로 배치 */
  left: 50%; /* 수평 중앙 정렬 */
  transform: translateX(-50%); /* 이미지 중심을 정확히 가운데로 이동 */
`;
