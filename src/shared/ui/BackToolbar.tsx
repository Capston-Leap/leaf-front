import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backIcon from '@icon/ic-arrow-left.svg';
import backIconWhite from '@icon/ic-arrow-left-white.svg';

interface BackToolbarProps {
  title?: string;
  isWhite?: boolean;
}

const BackToolbar = ({ title, isWhite }: BackToolbarProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <ToolbarContainer>
      <BackButton onClick={handleBackClick}>
        <img src={isWhite ? backIconWhite : backIcon} alt="back" />
      </BackButton>
      <Title $isWhite={isWhite}>{title}</Title>
    </ToolbarContainer>
  );
};

export default BackToolbar;

const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100vw;
  max-width: 480px;
  padding: 16px;
`;

const BackButton = styled.button`
  position: absolute;
  left: 16px;
  padding: 0;
  flex-wrap: wrap;
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

interface TitleProps {
  $isWhite?: boolean;
}

const Title = styled.div<TitleProps>`
  white-space: nowrap;
  font: ${({ theme }) => theme.fonts.body_sb_18px};
  color: ${({ $isWhite, theme }) => ($isWhite ? 'white' : theme.colors.gray900)};
  font-weight: bold;
`;
