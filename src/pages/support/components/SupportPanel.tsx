import React from 'react';
import styled from 'styled-components';

interface SupportPanelProps {
  children?: React.ReactNode;
}

const SupportPanel = ({ children }: SupportPanelProps) => {
  return (
    <SupportPanelContainer>
      {children}
    </SupportPanelContainer>
  );
};

export default SupportPanel;

const SupportPanelContainer = styled.div`
  padding-top: 24px;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 68px;
`;
