import CustomInput from "@onboarding/components/CustomInput.tsx";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { RegisterSchema, RegisterSchemaType } from "@onboarding/feature/schema/register.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMember } from "@onboarding/feature/hooks/mutate/useRegisterMember.ts";
import { RegisterUserRequest } from "@shared/types/request/user.ts";
import { useVerifyLoginId } from "@onboarding/feature/hooks/mutate/useVerifyLoginId.ts";
import { useState } from "react";

const SignupForm = () => {
  const { mutate } = useRegisterMember();
  const [visible, setVisible] = useState(false);
  const { mutate: mutateVerifyLoginId, data: verifyLoginResponse } = useVerifyLoginId();
  const { register, handleSubmit, getValues } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange',
  })

  const handleCheckDuplicate = () => {
      const loginId = getValues?.("loginId");
      if (loginId) {
        setVisible(true);
        mutateVerifyLoginId(loginId);
      }
  }

  const isValid = verifyLoginResponse?.status === 200

  return (
    <FormContainer onSubmit={handleSubmit((data: RegisterSchemaType) => {
      const { loginId, password, confirmPassword, name, nickname, birth } = data;
      const birthStr = birth.toString(); // 혹시 숫자로 들어오는 경우 문자열로 변환
      const formatedDate = `${birthStr.slice(0, 4)}-${birthStr.slice(4, 6)}-${birthStr.slice(6, 8)}`;

      const registerData: RegisterUserRequest = {
        loginId:loginId,
        password,
        passwordConfirm: confirmPassword,
        name,
        nickname,
        birth: formatedDate,
      }
      mutate(registerData)
    })}>

      <CustomInput<RegisterSchemaType>
        label="아이디"
        type="text"
        checkbox={true}
        placeholder="아이디를 입력해 주세요"
        register={register}
        name="loginId"
        getValues={getValues}
        isValid={isValid}
        handleClick={handleCheckDuplicate}
        message={verifyLoginResponse?.status === 200 ? "사용 가능한 아이디입니다." : "중복된 아이디입니다."}
        visible={visible} />
      <CustomInput<RegisterSchemaType> label="비밀번호" type="password" placeholder="비밀번호를 입력해 주세요" register={register} name="password" />
      <CustomInput<RegisterSchemaType> label="비밀번호 확인" type="password" placeholder="비밀번호를 다시 입력해 주세요" register={register} name="confirmPassword" />
      <CustomInput<RegisterSchemaType> label="이름" type="text" placeholder="이름을 입력해 주세요" register={register} name="name" />
      <CustomInput<RegisterSchemaType> label="닉네임" type="text" placeholder="닉네임을 입력해 주세요" register={register} name="nickname" />
      <CustomInput<RegisterSchemaType> label="생년월일" type="text" placeholder="생년월일을 입력해 주세요 ex) 19990101" register={register} name="birth" />
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
