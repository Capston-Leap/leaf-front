import GoalList from "@mission/components/GoalList.tsx";
import Description from "@onboarding/components/Description.tsx";
import styled from "styled-components";

const ForthStep = () => {
  return (
    <ForthStepContainer>
      <Description boldText={`리피와 함께할\n자립목표 영역을 선택해주세요`} mediumText={`한개의 영역을 마스터하면\n그 다음 영역을 고를 수 있어요`} />
      <GoalList enabled={true} init={true} />
    </ForthStepContainer>
  )
}

export default ForthStep;

const ForthStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
