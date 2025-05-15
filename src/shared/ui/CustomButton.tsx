import styled from 'styled-components';

interface CustomButtonProps {
  label: string;
  isValid?: boolean;
  onClick?: () => void;
  marginTop?: 'none' | 'auto';
}

const CustomButton = ({ label, isValid, onClick, marginTop }: CustomButtonProps) => {
  return (
    <Button $isValid={isValid} disabled={!isValid} onClick={onClick} $marginTop={marginTop}>
      {label}
    </Button>
  );
};

export default CustomButton;

interface ButtonProps {
  $isValid?: boolean;
  $marginTop?: 'none' | 'auto';
}

const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: 17px;
  padding: 18px 0 18px 0;
  width: 100%;
  color: white;
  margin-top: ${({ $marginTop }) => ($marginTop === "auto" ? 'auto' : 'none')};
  font: ${({ theme }) => theme.fonts.body_sb_18px};
  background-color: ${({ $isValid, theme }) =>
    $isValid ? theme.colors.primary : theme.colors.gray300};
`;
