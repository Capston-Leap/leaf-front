import styled from "styled-components";

interface CustomInputProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
}

const CustomInput = ({ label, type, required, placeholder }: CustomInputProps) => {
  return (
    <CustomInputContainer>
      <Label htmlFor={type}>{label}</Label>
      <Input type={type} name={type} placeholder={placeholder} required={required} />
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
  outline: none;
  color: black;
`;
