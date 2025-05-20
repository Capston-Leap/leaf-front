import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import CustomButton from "@shared/ui/CustomButton.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiaryWriteSchema, DiaryWriteSchemaType } from "@diary/feature/schema/diary.ts";
import RecordInput from "@diary/components/RecordInput.tsx";
import { useWriteDiary } from "@diary/feature/hooks/mutate/useWriteDiary.ts";
import { DiaryCreateRequest } from "@shared/types/request/diary.ts";
import { MoonLoader } from "react-spinners";

const DiaryWriteForm = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<DiaryWriteSchemaType>({
    resolver: zodResolver(DiaryWriteSchema),
    mode: 'onChange',
  });
  const { mutate, isPending } = useWriteDiary();

  const onSubmit = handleSubmit((data: DiaryWriteSchemaType) => {
    const request: DiaryCreateRequest = {
      daily: data.daily,
      memory: data.memory,
    };
    mutate(request);
  });

  if (isPending) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <MoonLoader color={"#59D9CC"} />
      </div>
    );
  }

  return (
    <InputFormWrapper>
      <form
        onSubmit={onSubmit}
        style={{ height: '100%', display: 'flex', flexDirection: 'column', marginTop: '30px' }}
      >
        <InputContainer>
          <RecordInput
            title="오늘 어떤 하루를 보냈나요?"
            name="daily"
            register={register}
            error={errors.daily?.message}
          />
          <RecordInput
            title="기억에 남는 일이 있었나요??"
            name="memory"
            register={register}
            error={errors.memory?.message}
          />
          <ButtonContainer>
            <CustomButton label="완료" isValid={isValid} />
          </ButtonContainer>
        </InputContainer>
      </form>
    </InputFormWrapper>
  );
};

export default DiaryWriteForm;

const InputFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  overflow-y: scroll;
`;

const InputContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 210px;
  display: flex;
  flex-direction: column;
  gap: 17px;
  margin-bottom: 32px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 18px;
  padding-bottom: 32px;
`;
