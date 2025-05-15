import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput.tsx';
import { useChatStore } from "@chat/feature/store/useChatStore.ts";
import { useGetChatHistory } from "@chat/feature/hooks/useGetChatHistory.ts";
import { useUserInfoStore } from "@shared/store/useUserInfoStore.ts";
import { useInView } from "react-intersection-observer";

const ChatRoom = () => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useGetChatHistory();
  const { userName } = useUserInfoStore();
  const { messages, clearMessages } = useChatStore();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const { ref, inView } = useInView();

  useEffect(() => {
    clearMessages();
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages]);

  if (isLoading && !data) {
    return <div>로딩중...</div>;
  }
  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <ChatWrapper>
      <div style={{ overflow: 'auto', marginBottom: '100px' }}>
        <ChatContainer>
          {data?.pages.map((page) =>
            page?.responseList.map((msg, index) => (
              <ChatBubble
                key={index}
                $isUser={msg.sender === userName}
              >
                {msg.content}
              </ChatBubble>
            )),
          )}

          {/* ✅ 스크롤 감지는 아래로 옮김 */}
          <div ref={ref} />
        </ChatContainer>
        <NewChatContainer ref={lastMessageRef}>
          {messages.map((msg, index) => (
            <ChatBubble
              key={index}
              $isUser={msg.isUser}
              ref={index === messages.length - 1 ? lastMessageRef : null}
            >
              {msg.content}
            </ChatBubble>
          ))}
        </NewChatContainer>
      </div>
      <ChatInput />
    </ChatWrapper>
  );
};

export default ChatRoom;

const ChatWrapper = styled.div`
  width: 100vw;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 16px;
`;

const ChatContainer = styled.div`
  flex: 1;
  padding: 18px 0;
  display: flex;
  flex-direction: column-reverse;
  gap: 16px;
`;

const NewChatContainer = styled.div`
  flex: 1;
  padding: 18px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ChatBubble = styled.div<{ $isUser: boolean }>`
  position: relative;
  align-self: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  background-color: ${({ $isUser, theme }) => ($isUser ? theme.colors.gray700 : 'white')};
  color: ${({ $isUser, theme }) => ($isUser ? 'white' : theme.colors.gray700)};
  font: ${({ theme }) => theme.fonts.body_m_16px};
  padding: 15px 25px;
  border-radius: 26px;
  max-width: 80%;
  word-wrap: break-word;
`;
