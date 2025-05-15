import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import CustomButton from "@shared/ui/CustomButton.tsx";
import RecordInput from "@mission/components/RecordInput.tsx";
import { MissionWriteSchema, MissionWriteSchemaType } from "@mission/feature/schema/mission.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWriteMissionRecord } from "@mission/feature/hooks/mutate/useWriteMissionRecord.ts";
import { MissionRecordRequest } from "@shared/types/request/mission.ts";

const RecordWriteForm = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const { mutate } = useWriteMissionRecord(parseInt(missionId!));
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<MissionWriteSchemaType>({
    resolver: zodResolver(MissionWriteSchema),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit((data: MissionWriteSchemaType) => {
    const request: MissionRecordRequest = {
      content: data.content,
      emotion: data.emotion,
    };
    mutate(request);
  });


  return (
    <InputFormWrapper>
      <MissionTitle>{'3일 동안의 식단 작성하기'}</MissionTitle>
      <form
        onSubmit={onSubmit}
        style={{ height: '100%', display: 'flex', flexDirection: 'column', marginTop: '30px' }}
      >
        <InputContainer>
          <RecordInput
            title="어떤 미션을 수행했나요?"
            name="content"
            register={register}
            error={errors.content?.message}
          />
          <RecordInput
            title="수행 후 어떤 기분이 들었나요?"
            name="emotion"
            register={register}
            error={errors.emotion?.message}
          />
          <ButtonContainer>
            <CustomButton label="완료" isValid={isValid} />
          </ButtonContainer>
        </InputContainer>
      </form>
    </InputFormWrapper>
  );
};

export default RecordWriteForm;

const InputFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  overflow-y: scroll;
`;

const MissionTitle = styled.span`
  margin-top: 6px;
  margin-left: 8px;
  font: ${({ theme }) => theme.fonts.heading_sb_22px};
  color: ${({ theme }) => theme.colors.gray900};
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
