import styled from 'styled-components';
import { AreaDescription, AreaType } from "@shared/types/area.ts";

interface ConfirmContentProps {
  goalType: string;
  image: string;
}

const ConfirmContent = ({ goalType = 'DAILY_LIFE', image }: ConfirmContentProps) => {
  return (
    <ConfirmContentContainer>
      <TextBold>해당 영역을 목표로 지정할까요?</TextBold>
      <Image src={image} />
      <TextBold style={{ marginTop: '40px' }}>{AreaType[goalType]} 마스터하기</TextBold>
      <TextMedium>{AreaDescription[goalType]}</TextMedium>
    </ConfirmContentContainer>
  );
};

export default ConfirmContent;

const ConfirmContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Image = styled.img`
  margin-top: 70px;
  width: 271px;
  height: 271px;
  object-fit: contain;
`;

const TextBold = styled.span`
  font: ${({ theme }) => theme.fonts.heading_sb_24px};
  color: ${({ theme }) => theme.colors.gray900};
`;

const TextMedium = styled.span`
  margin-top: 14px;
  font: ${({ theme }) => theme.fonts.body_m_16px};
  color: ${({ theme }) => theme.colors.gray500};
  text-align: center;
  display: block;
  white-space: pre-line;
`;
