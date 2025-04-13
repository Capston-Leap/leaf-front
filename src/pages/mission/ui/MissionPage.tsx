import styled from 'styled-components';
import NavBar from "@shared/ui/NavBar.tsx";
import Toolbar from "@shared/ui/Toolbar.tsx";
import MissionTabs from "@mission/components/MissionTabs.tsx";

export const MissionPage = () => {
  return (
    <MissionContainer>
      <Toolbar title='미션' />
      <MissionTabs />
      <NavBar />
    </MissionContainer>
  );
};

const MissionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray100};
  overflow-y: auto;
`;
