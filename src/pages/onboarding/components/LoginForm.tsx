import CustomInput from "@onboarding/components/CustomInput.tsx";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "@onboarding/feature/schema/login.ts";
import { useLoginUser } from "@onboarding/feature/hooks/mutate/useLoginUser.ts";
import { LoginRequest } from "@shared/types/request/user.ts";

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  })
  const { mutate } = useLoginUser();

  return (
    <FormContainer onSubmit={handleSubmit((data: LoginSchemaType) => {
      const { loginId, password } = data;
      const loginData: LoginRequest = {
        loginId,
        password,
      }
      mutate(loginData);
    })}>
      <CustomInput<LoginSchemaType> label="아이디" type="text" placeholder="아이디를 입력해 주세요" required={true} register={register} name="loginId"  />
      <CustomInput<LoginSchemaType> label="비밀번호" type="password" placeholder="비밀번호를 입력해 주세요" required={true} register={register} name="password" />
      <Button $isValid={true}>로그인</Button>
    </FormContainer>
  );
};

export default LoginForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20%;
  gap: 20px;
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
