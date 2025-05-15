import styled from 'styled-components';
import washer from '@img/washer.png';
import door from '@img/door.png';
import money from '@img/money.png';
import clean from '@img/clean.png';
import DoneCard from "@mission/components/DoneCard.tsx";
import { useNavigate } from "react-router";

const goalList = [
  {
    id: 1,
    goalName: '일상생활기술',
    image: washer,
    type: 'LIFE',
  },
  {
    id: 2,
    goalName: '자기관리기술',
    image: clean,
    type: 'SELF',
  },
  {
    id: 3,
    goalName: '돈관리기술',
    image: money,
    type: 'MONEY',
  },
  {
    id: 4,
    goalName: '사회진출기술',
    image: door,
    type: 'SOCIETY',
  },
];

interface GoalListProps {
  enabled: boolean;
  init: boolean;
  currentAreaType?: string;
}

const GoalList = ({ enabled, init, currentAreaType }: GoalListProps) => {
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    console.log(id);
    const goal = goalList.find((el) => el.type == id);
    console.log(goal);
    if (init) {
      navigate('/goal/confirm', { state: { goal } });
    }
    navigate('/goal/confirm', { state: { goal } });
  };

  return (
    <GoalListContainer>
      {goalList.map((goal) => {
        const isCompleted = false;
        const isCurrent = currentAreaType === goal.type;

        return (
          <GoalContainer
            key={goal.id}
            onClick={enabled && !isCompleted ? () => handleNavigate(goal.type) : () => {
            }}
          >
            {isCompleted ? (
              <DoneCardWrapper>
                <DoneCard label={'완료'} />
              </DoneCardWrapper>
            ) : isCurrent ? (
              <DoneCardWrapper>
                <DoneCard label={'진행중'} />
              </DoneCardWrapper>
            ) : null}
            <Image src={goal.image} alt={goal.goalName} />
            <GoalTypeText>{goal.goalName}</GoalTypeText>
          </GoalContainer>
        );
      })}
    </GoalListContainer>
  );
};

export default GoalList;

const GoalListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;

  & > div {
    flex: 0 1 calc(50% - 12px);
    max-width: 210px;
    box-sizing: border-box;
  }
`;

const DoneCardWrapper = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
`;

const Image = styled.img`
  width: 130px;
  height: 130px;
  margin-top: 20px;
`;

const GoalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 210px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const GoalTypeText = styled.div`
  margin-top: 6px;
  font: ${({ theme }) => theme.fonts.body_sb_18px};
  color: ${({ theme }) => theme.colors.gray900};
`;
