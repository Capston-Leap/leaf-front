import styled from "styled-components";

interface CustomInputProps {
  label: string;
  type: string;
  checkbox?: boolean;
  placeholder: string;
  required?: boolean;
}

const CustomInput = ({ label, type, required, placeholder, checkbox }: CustomInputProps) => {
  return (
    <CustomInputContainer>
      <Label htmlFor={type}>{label}</Label>
      <Input type={type} name={type} placeholder={placeholder} required={required} />
      {checkbox ? <CheckButton $isValid={true} onClick={() => null}>중복확인</CheckButton> : null}
    </CustomInputContainer>
  )
}

export default CustomInput

const CustomInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px
`;

const Label = styled.label`
  font: ${({ theme }) => theme.fonts.body_bold_16px};
  color: black;
`;

const Input = styled.input`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 15px 14px;
  background-color: #F7F3F3;
  font: ${({ theme }) => theme.fonts.body_m_14px};
  outline: none;
  color: black;
`;

const CheckButton = styled.button<{ $isValid: boolean }>`
  margin-left: auto;
  border: none;
  border-radius: 8px;
  padding: 9px 34px;
  color: white;
  font: ${({ theme }) => theme.fonts.body_m_14px};
  background-color: ${({ $isValid, theme }) =>
    $isValid ? theme.colors.primary : theme.colors.gray300};
`
