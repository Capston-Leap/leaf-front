import styled from "styled-components";
import SupportPanel from "@support/components/SupportPanel.tsx";
import SupportOverviewCard from "@support/components/SupportOverviewCard.tsx";
import SupportList from "@support/components/SupportList.tsx";
import { useHandleSupportTab } from "@support/feature/hooks/useHandleSupportTab.ts";

const SupportTabs = () => {
  const { activeTab, handleTab, tabRefs, indicatorStyle } = useHandleSupportTab();

  return (
    <TabContainer>
      <TabWrapper>
        <Tab ref={tabRefs[0]} $isTab={1 == activeTab} onClick={() => handleTab(1)}>전체</Tab>
        <Tab ref={tabRefs[1]} $isTab={2 == activeTab} onClick={() => handleTab(2)}>경제</Tab>
        <Tab ref={tabRefs[2]} $isTab={3 == activeTab} onClick={() => handleTab(3)}>주거</Tab>
        <Tab ref={tabRefs[3]} $isTab={4 == activeTab} onClick={() => handleTab(4)}>진로</Tab>
      </TabWrapper>
      <TabIndicator
        style={{
          width: indicatorStyle.width,
          left: indicatorStyle.left,
        }}
      />
      <TabBox>
        <SupportPanel>
          {activeTab === 1 && (
            <>
              <SupportOverviewCard />
              <SupportList />
            </>
          )}
          {activeTab === 2 && <SupportList supportType="ECONOMY" />}
          {activeTab === 3 && <SupportList supportType="HOUSING" />}
          {activeTab === 4 && <SupportList supportType="CAREER" />}
        </SupportPanel>
      </TabBox>
    </TabContainer>
  );
};

export default SupportTabs;

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
  padding: 0 16px;
  overflow-y: auto;
`;
