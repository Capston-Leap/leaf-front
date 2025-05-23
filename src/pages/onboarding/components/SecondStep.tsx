import styled from "styled-components";
import Loader from "@onboarding/components/Loader.tsx";
import { useEffect } from "react";
import { useUserInfo } from "@shared/hooks/query/useUserInfo.ts";

interface SecondStepProps {
  handleNext: () => void;
}

const SecondStep = ({ handleNext }: SecondStepProps) => {
  const { data, isLoading } = useUserInfo();

  useEffect(() => {
    setTimeout(() => {
      handleNext();
    }, 5000);
  });

  if (isLoading) return <div>로딩중...</div>;

  return (
    <ContentContainer style={{ justifyContent: 'space-between' }}>
      <p className="loader-text">{`${data?.name ? data.name : "사용자"}님과 어울리는\n리피를 생성해드릴게요!`}</p>
      <div style={{ width: '100%', height: '44px' }} />
      <Loader />
      <div style={{ width: '100%', height: '44px' }} />
      <p className="loader-text">{`잠시만 기다려주세요`}</p>
    </ContentContainer>
  );
};

export default SecondStep;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 16px 140px 16px;
  display: flex;
  flex-direction: column;
  margin-top: 56px;

  .title {
    ${({ theme }) => theme.fonts.heading_sb_24px};
    color: ${({ theme }) => theme.colors.gray900};
    white-space: pre-line; /* 줄바꿈을 반영 */
  }

  .loader-text {
    ${({ theme }) => theme.fonts.heading_sb_24px};
    color: ${({ theme }) => theme.colors.gray900};
    margin: auto;
    white-space: pre-line; /* 줄바꿈을 반영 */
    text-align: center; /* 중앙 정렬 */
  }

  > img {
    margin: auto;
  }
`;
