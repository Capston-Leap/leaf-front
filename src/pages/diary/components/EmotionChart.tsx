import styled from 'styled-components';
import { EmotionScores } from '@shared/types/response/diary.ts';

interface EmotionChartProps {
  scores: EmotionScores;
}

const EmotionChart = ({ scores }: EmotionChartProps) => {
  return (
    <ChartWrapper>
      {Object.entries(scores).map(([emotion, score]) => (
        <BarRow key={emotion}>
          <EmotionLabel>{emotion}</EmotionLabel>
          <BarBox>
            <BarFill width={score} />
          </BarBox>
          <ScoreText>{score.toFixed(0)}%</ScoreText>
        </BarRow>
      ))}
    </ChartWrapper>
  );
};

export default EmotionChart;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 20px;
`;

const BarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const EmotionLabel = styled.div`
  width: 48px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.gray900};
  flex-shrink: 0;
`;

const BarBox = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray200};
  border-radius: 10px;
  height: 12px;
  position: relative;
`;

const BarFill = styled.div<{ width: number }>`
  width: ${({ width }) => Math.min(width, 100)}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  transition: width 0.4s ease;
`;

const ScoreText = styled.div`
  width: 40px;
  font-size: 14px;
  text-align: right;
  color: ${({ theme }) => theme.colors.gray700};
  flex-shrink: 0;
`;
