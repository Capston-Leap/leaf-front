import Header from "@onboarding/components/Header.tsx";
import { useState } from "react";
import FirstStep from "@onboarding/components/FirstStep.tsx";
import SecondStep from "@onboarding/components/SecondStep.tsx";
import ThirdStep from "@onboarding/components/ThirdStep.tsx";
import ForthStep from "@onboarding/components/ForthStep.tsx";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  }

  return (
    <OnboardingPageContainer $step={step}>
      <Header step={step} handleBack={handleBack} />
      {step == 1 && <FirstStep handleNext={handleNext} />}
      {step == 2 && <SecondStep handleNext={handleNext} />}
      {step == 3 && <ThirdStep handleNext={handleNext} />}
      {step == 4 && <ForthStep />}
    </OnboardingPageContainer>
  )
};

const OnboardingPageContainer = styled.div<{$step: number}>`
  display: flex;
  flex-direction: column;
  padding: 0 16px 16px 16px;
  background-color: ${({ theme, $step }) => $step === 4 ? theme.colors.gray100 : 'white'};
  height: 100%;
  overflow-y: auto;
`;
