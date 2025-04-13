import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import styled from 'styled-components';
import { theme } from "@app/styles";
import { useHandleProgress } from "@mission/feature/custom/useHandleProgress.ts";

interface GoalProgressbarProps {
  value: number;
}

const GoalProgressbar = ({ value }: GoalProgressbarProps) => {
  const { currentValue } = useHandleProgress(value);

  return (
    <HalfCircleWrapper>
      <CircularProgressbarWithChildren
        value={currentValue}
        maxValue={100}
        circleRatio={0.5}
        styles={buildStyles({
          rotation: 0.75,
          strokeLinecap: 'round',
          trailColor: theme.colors.gray200,
          pathColor: theme.colors.primary,
        })}
      >
        <ProgressRate>{`${value}%`}</ProgressRate>
      </CircularProgressbarWithChildren>
    </HalfCircleWrapper>
  );
};

export default GoalProgressbar;

const HalfCircleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 90px;
  height: 41px;
`;

const ProgressRate = styled.div`
  font: ${({ theme }) => theme.fonts.body_sb_18px};
  color: ${({ theme }) => theme.colors.gray900};
  padding-bottom: 20px;
`;
