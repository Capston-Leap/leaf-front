import sendIcon from '@icon/ic-send.svg';
import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useChatStore } from "@chat/feature/store/useChatStore.ts";

const ChatInput = () => {
  const [value, setValue] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { addMessage } = useChatStore();

  /*const mutation = useMutation({
    mutationFn: async (message: string) => postChat(message),
    onSuccess: (data) => {
      const botReply = { id: Date.now(), content: data.answer, isUser: false };
      addMessage(botReply);
    },
    onError: (error) => {
      console.error('Chat API Error:', error);
    },
  });*/

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);

    if (textAreaRef.current) {
      textAreaRef.current.style.height = '52px';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const handleSendMessage = () => {
    /*if (value.trim()) {
      const userMessage: Message = { id: Date.now(), content: value.trim(), isUser: true };
      addMessage(userMessage);

      setValue('');
      if (textAreaRef.current) {
        textAreaRef.current.style.height = '52px';
      }
      mutation.mutate(value.trim());
    }*/
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    /*if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }*/
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    /*if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
      if (textAreaRef.current) {
        textAreaRef.current.style.height = '52px'; //
      }
    }*/
  };

  return (
    <InputContainer>
      <ChatTextArea
        ref={textAreaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder='메세지를 입력해주세요'
      />
      <SendButton
        className={value.trim() ? 'visible' : ''}
        onClick={handleSendMessage}
        disabled={!value.trim()}
      >
        <img src={sendIcon} alt='Send' />
      </SendButton>
    </InputContainer>
  );
};

export default ChatInput;

const InputContainer = styled.div`
  position: fixed;
  width: 90%;
  max-width: 400px;
  bottom: 32px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 30px;
  padding: 0 16px; /* 좌우 패딩으로 간격 확보 */
  left: 50%; /* X축 기준으로 가운데 정렬 */
  transform: translateX(-50%); /* X축 정렬을 위해 사용 */
`;

const ChatTextArea = styled.textarea`
  flex: 1;
  border: none;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.gray100};
  font: ${({ theme }) => theme.fonts.body_m_16px};
  color: ${({ theme }) => theme.colors.gray900};
  outline: none;
  resize: none;
  height: 52px;
  min-height: 52px;
  max-height: 150px;
  overflow-y: auto;
  padding: 15px;
`;

const rotateAnimation = keyframes`
  0% {
    transform: scale(0.9) rotate(0deg);
  }
  25% {
    transform: scale(1) rotate(-20deg);
  }
  50% {
    transform: scale(1) rotate(10deg);
  }
  75% {
    transform: scale(1) rotate(-10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
`;

const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-left: 4px; /* 텍스트 영역과의 간격 */

  opacity: 0;
  transform: scale(0.9);
  transition:
    opacity 0.3s ease,
    transform 0.1s ease;

  &.visible {
    opacity: 1;
    transform: scale(1);
    animation: ${rotateAnimation} 0.3s ease;
  }

  img {
    width: 24px;
    height: 24px;
  }
`;
