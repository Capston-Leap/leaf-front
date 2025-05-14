import styled from 'styled-components';
import CardButton from "@home/compoenets/CardButton.tsx";
import { Support } from "@home/feature/type/support.ts";

interface SupportProgramProps {
  supportType: string;
  supportTitle: string;
  supportSubTitle: string;
  link: string;
}

const SupportCard = ({ supportType, supportTitle, supportSubTitle, link }: SupportProgramProps) => {

  const type = Support[supportType] ? Support[supportType] : "기타";
  return (
    <MissionContainer>
      <TextContainer>
        <SupportTextSmall>{type}</SupportTextSmall>
        <SupportTitle>{supportTitle}</SupportTitle>
        <SupportTextSmall>{supportSubTitle}</SupportTextSmall>
      </TextContainer>
      <ButtonContainer>
        <CardButton
          label='바로가기'
          onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}
          isDisabled={false}
        />
      </ButtonContainer>
    </MissionContainer>
  );
};

export default SupportCard;

const MissionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  width: 100%;
  max-width: 480px;
  height: 112px;
  border-radius: 30px;
  border: none;
  background-color: white;
  padding: 20px 24px 16px 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  width: 70%;
`;

const SupportTextSmall = styled.div`
  font: ${({ theme }) => theme.fonts.body_m_14px};
  color: ${({ theme }) => theme.colors.gray500};
  font-weight: bold;
  
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SupportTitle = styled.div`
  font: ${({ theme }) => theme.fonts.body_sb_18px};
  color: ${({ theme }) => theme.colors.gray900};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  align-content: flex-end;
`;
