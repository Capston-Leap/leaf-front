import styled from "styled-components";
import { useState } from "react";
import { ChatbotSettingRequest } from "@shared/types/request/user.ts";

interface SelectorProps {
  type: 'gender' | 'Character';
  handleChatbotSetting: (type: keyof ChatbotSettingRequest, value: string) => void
}

const selectorType = {
  gender: {
    title: '성별',
    options: ['🐥 남자 리피를 원해!', '🐰 여자 리피를 원해!'],
  },
  personality: {
    title: '성격',
    options: ['🐻 다정하고 공감적인 리피', '🐱 이성적인 조언가 리피'],
  },
};

const Selector = ({ type, handleChatbotSetting }: SelectorProps) => {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const options: string[] = type === 'gender' ? selectorType.gender.options : selectorType.personality.options;

  const handleSelect = (index: number) => {
    setSelectedNumber(index + 1);
    const value = type === 'gender'
      ? index === 0 ? 'M' : 'F'
      : index === 0 ? 'F' : 'T';
    handleChatbotSetting(type === 'Character' ? 'character' : type, value);
  };

  return (
    <div>
      <p>{type === 'gender' ? '성별' : '성격'}</p>
      <CardList style={{ display: 'flex', gap: '16px' }}>
        {options.map((option, index) => (
          <Card key={index} $isSelected={selectedNumber === index + 1} onClick={() => {
            handleSelect(index)
          }}
          >{option}</Card>
        ))}
      </CardList>
    </div>
  );
};

export default Selector;

const Card = styled.div<{ $isSelected: boolean }>`
  border-radius: 18px;
  padding: 22px 16px;
  border: ${({ $isSelected, theme }) => ($isSelected ? `1px solid ${theme.colors.primary}` : '1px solid transparent')};
  background-color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.sub : theme.colors.gray50)};
`
const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  margin-top: 11px;
`;
