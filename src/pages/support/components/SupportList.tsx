import styled from 'styled-components';
import SupportCard from './SupportCard.tsx';
import { supportPrograms } from "@support/feature/mocks/supportPrograms.ts";

interface SupportListProps {
  supportType?: string;
}

const SupportList = ({ supportType }: SupportListProps) => {
  const data = supportType
    ? supportPrograms.filter((support) => support.supportType === supportType)
    : supportPrograms;

  return (
    <SupportListContainer>
      {data.map((support) => (
        <SupportCard
          key={support.id}
          supportType={support.supportType}
          supportTitle={support.supportTitle}
          supportSubTitle={support.supportSubTitle} link=""
        />
      ))}
    </SupportListContainer>
  );
};

export default SupportList;

const SupportListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  gap: 16px;
`;
