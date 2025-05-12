import styled from 'styled-components';
import SupportTabs from "@support/components/SupportTabs.tsx";
import BackToolbar from "@shared/ui/BackToolbar.tsx";


const SupportPage = () => {
  return (
    <SupportContainer>
      <BackToolbar title="지원제도" isWhite={false} />
      <SupportTabs />
    </SupportContainer>
  );
};

export default SupportPage;

const SupportContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 440px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray100};
`;
