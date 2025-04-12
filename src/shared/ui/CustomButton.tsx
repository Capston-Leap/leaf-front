import styled from 'styled-components';

interface CustomButtonProps {
  label: string;
  isValid?: boolean;
  onClick?: () => void;
}

const CustomButton = ({ label, isValid, onClick }: CustomButtonProps) => {
  return (
    <Button $isValid={isValid} disabled={!isValid} onClick={onClick}>
      {label}
    </Button>
  );
};

export default CustomButton;

interface ButtonProps {
  $isValid?: boolean;
}

const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: 17px;
  padding: 18px 0 18px 0;
  width: 100%;
  color: white;
  font: ${({ theme }) => theme.fonts.body_sb_18px};
  background-color: ${({ $isValid, theme }) =>
    $isValid ? theme.colors.primary : theme.colors.gray300};
`;
