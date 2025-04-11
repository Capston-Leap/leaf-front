import styled from 'styled-components';

interface ToolbarProps {
  title: string;
}

const Toolbar = ({ title }: ToolbarProps) => {
  return (
    <ToolbarContainer>
      <p>{title}</p>
    </ToolbarContainer>
  );
};

export default Toolbar;

const ToolbarContainer = styled.div`
  width: 100vw;
  max-width: 480px;
  padding: 6px 331px 6px 24px;

  p {
    white-space: nowrap;
    width: 100%;
    font: ${({ theme }) => theme.fonts.heading_sb_22px};
    color: ${({ theme }) => theme.colors.gray900};
  }
`;
