import Description from "@onboarding/components/Description.tsx";
import Selector from "@onboarding/components/Selector.tsx";
import styled from "styled-components";
import CustomButton from "@shared/ui/CustomButton.tsx";
import { useSettingChatbot } from "@onboarding/feature/hooks/mutate/useSettingChatbot.ts";
import { useState } from "react";
import { ChatbotSettingRequest } from "@shared/types/request/user.ts";

interface FirstStepProps {
  handleNext: () => void;
}

const FirstStep = ({ handleNext }: FirstStepProps) => {
  const { mutate } = useSettingChatbot(handleNext);
  const [chatbotInfo, setChatbotInfo] = useState<ChatbotSettingRequest>({
    gender: "",
    character: "",
  });

  const handleChatbotSetting = (type: keyof ChatbotSettingRequest, value: string) => {
    setChatbotInfo((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <FirstStepContainer>
      <Description boldText="어떤 리피를 원하시나요?" mediumText="선택지에 따라 함께 할 리피가 정해져요!" />
      <Selector type="gender" handleChatbotSetting={handleChatbotSetting} />
      <Selector type="Character" handleChatbotSetting={handleChatbotSetting} />
      <CustomButton label="다음" isValid={chatbotInfo.gender !== "" && chatbotInfo.character !== ""} onClick={() => mutate(chatbotInfo!)} marginTop="auto" />
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
