import { Path, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import styled from "styled-components";
import { RegisterSchemaType } from "@onboarding/feature/schema/register.ts";
import { LoginSchemaType } from "@onboarding/feature/schema/login.ts";

interface CustomInputProps<T extends RegisterSchemaType | LoginSchemaType> {
  label: string;
  type: string;
  checkbox?: boolean;
  placeholder: string;
  required?: boolean;
  name: Path<T>;
  register: UseFormRegister<T>;
  watch?: UseFormWatch<T>;
  setValue?: UseFormSetValue<T>;
  getValues?: UseFormGetValues<T>;
  isValid?: boolean;
  message?: string;
  handleClick?: () => void;
  visible?: boolean;
}

const CustomInput = <T extends RegisterSchemaType | LoginSchemaType>({ label, type, required, placeholder, checkbox, name, register, isValid, message, handleClick, visible }: CustomInputProps<T>) => {
  return (
    <CustomInputContainer>
      <Label htmlFor={type}>{label}</Label>
      <Input type={type} placeholder={placeholder} required={required} {...register(name)} />
      {<ErrorMessage style={{ visibility: visible ? "visible" : "hidden" }} $isValid={isValid !== undefined && isValid}>{message}</ErrorMessage>}
      {checkbox ? <CheckButton $isValid={true} onClick={handleClick}>중복확인</CheckButton> : null}
    </CustomInputContainer>
  )
}

export default CustomInput

const CustomInputContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-top: 10px;
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

const ErrorMessage = styled.span<{ $isValid: boolean }>`
  font: ${({ theme }) => theme.fonts.body_m_12px};
  color: ${({ $isValid, theme }) => $isValid ? theme.colors.primary : "#FF0000"};
  height: 1rem;
`
