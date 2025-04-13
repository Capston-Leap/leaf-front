import styled from "styled-components";
import { useHandleTab } from "@mission/feature/custom/useHandleTab.ts";
import CurrentGoal from "@mission/components/CurrentGoal.tsx";
import MissionList from "@mission/components/MissionList.tsx";

const MissionTabs = () => {
  const { activeTab, handleTab, tabRefs, indicatorStyle } = useHandleTab();

  return (
    <TabContainer>
      <TabWrapper>
        <Tab ref={tabRefs[0]} $isTab={1 == activeTab} onClick={() => handleTab(1)}>자립목표</Tab>
        <Tab ref={tabRefs[1]} $isTab={2 == activeTab} onClick={() => handleTab(2)}>진행중인 미션</Tab>
        <Tab ref={tabRefs[2]} $isTab={3 == activeTab} onClick={() => handleTab(3)}>완료한 미션</Tab>
      </TabWrapper>
      <TabIndicator
        style={{
          width: indicatorStyle.width,
          left: indicatorStyle.left,
        }}
      />
      <TabBox>
        {activeTab === 1 && <CurrentGoal />}
        {activeTab === 2 && <MissionList type="onGoing" />}
        {activeTab === 3 && <MissionList type="completed" />}
      </TabBox>
    </TabContainer>
  );
};

export default MissionTabs;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

const Tab = styled.div<{ $isTab: boolean }>`
  color: ${({ theme, $isTab }) => $isTab ? theme.colors.gray900 : theme.colors.gray400};
  font: ${({ theme, $isTab }) => $isTab ? theme.fonts.body_sb_18px : theme.fonts.body_m_18px};
  outline: none;
  border: none;
  cursor: pointer;
  padding: 15px 0 8px 0;

  &:focus {
    outline: none;
  }
`;

const TabWrapper = styled.div`
  position: relative;
  display: flex;
  padding-left: 22px;
  gap: 28px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray200};
`;

const TabIndicator = styled.div`
  position: relative;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.main1};
  transition: left 0.3s ease,
  width 0.3s ease;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray900};
`;

const TabBox = styled.div`
  padding: 24px 16px 0 16px;
  overflow-y: auto;
`;
