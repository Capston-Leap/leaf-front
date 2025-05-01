import styled from "styled-components";
import { useState } from "react";

interface SelectorProps {
  type: 'gender' | 'personality';
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

const Selector = ({ type }: SelectorProps) => {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const options: string[] = type === 'gender' ? selectorType.gender.options : selectorType.personality.options;

  return (
    <div>
      <p>{type === 'gender' ? '성별' : '성격'}</p>
      <CardList style={{ display: 'flex', gap: '16px' }}>
        {options.map((option, index) => (
          <Card key={index} $isSelected={selectedNumber === index + 1} onClick={() => setSelectedNumber(index + 1)}>{option}</Card>
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
