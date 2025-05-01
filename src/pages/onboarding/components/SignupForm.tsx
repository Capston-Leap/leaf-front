import CustomInput from "@onboarding/components/CustomInput.tsx";
import styled from "styled-components";

const SignupForm = () => {
  return (
    <FormContainer>
      <CustomInput label="아이디" type="text" checkbox={true} placeholder="아이디를 입력해 주세요" />
      <CustomInput label="비밀번호" type="password" placeholder="비밀번호를 입력해 주세요" />
      <CustomInput label="비밀번호 확인" type="password" placeholder="비밀번호를 다시 입력해 주세요" />
      <CustomInput label="이름" type="text" placeholder="이름을 입력해 주세요" />
      <CustomInput label="닉네임" type="text" placeholder="닉네임을 입력해 주세요" />
      <CustomInput label="생년월일" type="number" placeholder="생년월일을 입력해 주세요" />
      <Button $isValid={true}>회원가입</Button>
    </FormContainer>
  )
}

export default SignupForm;

const FormContainer = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15% 17px 20px 17px;
`;

const Button = styled.button<{ $isValid: boolean }>`
  margin-top: auto;
  border: none;
  border-radius: 10px;
  padding: 12px 0;
  width: 100%;
  color: white;
  font: ${({ theme }) => theme.fonts.body_sb_18px};
  background-color: ${({ $isValid, theme }) =>
  $isValid ? theme.colors.primary : theme.colors.gray300};
`;
