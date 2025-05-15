import styled from 'styled-components';
import ArrowLeftIcon from '@icon/ic-arrow-left.svg';

interface HeaderProps {
  step: number;
  handleBack: () => void;
}

const Header = ({ step, handleBack }: HeaderProps) => {
  return (
    <Container>
      <img src={ArrowLeftIcon} onClick={handleBack}  alt=""/>
      <ProgressContainer>
        <ActiveBox $position={step} />
      </ProgressContainer>
      <div style={{ width: '24px', visibility: 'hidden' }} />
    </Container>
  );
}

export default Header;

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
  max-width: 440px;
`;

const ProgressContainer = styled.div`
  width: 60%;
  height: 5px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.gray200};
`;

const ActiveBox = styled.div<{ $position: number }>`
  height: 5px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary};
  width: ${({ $position }) => ( 25 * $position)}%;;
`;
