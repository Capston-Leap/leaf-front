import styled from 'styled-components';

interface MissionButtonProps {
  label: string;
  isDisabled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CardButton = ({ label, isDisabled, onClick }: MissionButtonProps) => {
  // 버튼 클릭 시 이벤트 버블링 중단
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // 부모 요소로의 이벤트 전파 중단
    onClick(e); // 실제 클릭 이벤트 실행
  };

  return (
    <Button $isComplete={isDisabled} onClick={handleClick} disabled={isDisabled}>
      {label}
    </Button>
  );
};

export default CardButton;

interface ButtonProps {
  $isComplete: boolean;
}

const Button = styled.button<ButtonProps>`
  font: ${({ theme }) => theme.fonts.body_m_14px};
  background-color: ${({ $isComplete, theme }) => ($isComplete ? '#e6f0fc' : theme.colors.primary)};
  color: ${({ $isComplete }) => ($isComplete ? '#3e7be2' : 'white')};
  border: none;
  border-radius: 13px;
  padding: ${({ $isComplete }) => ($isComplete ? '6px 22px 6px 22px' : '6px 15px 6px 15px')};
`;
