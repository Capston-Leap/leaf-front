import Description from "@onboarding/components/Description.tsx";
import Selector from "@onboarding/components/Selector.tsx";
import styled from "styled-components";
import CustomButton from "@shared/ui/CustomButton.tsx";

interface FirstStepProps {
  handleNext: () => void;
}

const FirstStep = ({ handleNext }: FirstStepProps) => {
  return (
    <FirstStepContainer>
      <Description boldText="어떤 리피를 원하시나요?" mediumText="선택지에 따라 함께 할 리피가 정해져요!" />
      <Selector type="gender" />
      <Selector type="personality" />
      <CustomButton label="다음" isValid={true} onClick={handleNext} marginTop="auto" />
    </FirstStepContainer>
  );
};

export default FirstStep;

const FirstStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 100%;
`;
