import styled from 'styled-components';
import { UseFormRegister } from 'react-hook-form';
import React, { useState } from 'react';

type FormValues = {
  mission?: string;
  feeling?: string;
};

interface TextInputProps {
  title: string;
  name: keyof FormValues;
  register: UseFormRegister<FormValues>;
  error?: string;
}

const RecordInput = ({ title, register, name, error }: TextInputProps) => {
  const [length, setLength] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLength(event.target.value.length);
  };

  return (
    <TextInputContainer>
      <p>{title}</p>
      <InputArea
        placeholder='내용을 입력해주세요.'
        maxLength={200}
        {...register(name)}
        onChange={(event) => {
          register(name).onChange(event);
          handleChange(event);
        }}
      />
      <BottomContentContainer>
        <ErrorMessage>{error}</ErrorMessage>
        <TextLength $length={length}>{length}/200</TextLength>
      </BottomContentContainer>
    </TextInputContainer>
  );
};

export default RecordInput;

const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin-left: 6px;
    font: ${({ theme }) => theme.fonts.body_sb_18px};
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const InputArea = styled.textarea`
  height: 210px;
  margin-top: 12px;
  padding: 18px;
  border: 2px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 28px;
  background-color: white;
  resize: none;
  overflow-wrap: break-word;
  outline: none;
  color: ${({ theme }) => theme.colors.gray900};
  font: ${({ theme }) => theme.fonts.body_m_16px};
`;

const BottomContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ErrorMessage = styled.div`
  font: ${({ theme }) => theme.fonts.body_m_14px};
  color: red;
  margin-left: 10px;
`;

const TextLength = styled.div<{ $length: number }>`
  margin-top: 6px;
  font: ${({ theme }) => theme.fonts.body_m_14px};
  color: ${({ $length, theme }) => ($length > 0 ? theme.colors.gray600 : theme.colors.gray300)};
  align-self: flex-end;
  margin-right: 10px;
`;
