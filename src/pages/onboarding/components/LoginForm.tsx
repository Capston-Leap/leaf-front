import CustomInput from "@onboarding/components/CustomInput.tsx";
import styled from "styled-components";

const LoginForm = () => {
  return (
    <FormContainer>
      <CustomInput label="아이디" type="text" name="text" placeholder="아이디를 입력해 주세요" required={true} />
      <CustomInput label="비밀번호" type="password" name="password" placeholder="비밀번호를 입력해 주세요" required={true} />
      <Button $isValid={true} onClick={() => null} type="submit">로그인</Button>
    </FormContainer>
  );
};

export default LoginForm;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20%;
  gap: 30px;
  padding: 0 16px;
`;

const Button = styled.button<{ $isValid: boolean }>`
  margin-top: 10px;
  border: none;
  border-radius: 10px;
  padding: 12px 0;
  width: 100%;
  color: white;
  font: ${({ theme }) => theme.fonts.body_sb_18px};
  background-color: ${({ $isValid, theme }) =>
  $isValid ? theme.colors.primary : theme.colors.gray300};
`;
