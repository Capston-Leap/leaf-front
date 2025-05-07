import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MissionRecord } from '../../../@type/mission.ts';
import CustomButton from "@shared/ui/CustomButton.tsx";
import RecordInput from "@mission/components/RecordInput.tsx";

const schema = yup.object().shape({
  mission: yup
    .string()
    .min(50, '최소 50자 이상 작성하셔야 합니다.')
    .max(200, '최대 200자까지 작성 가능합니다.'),
  feeling: yup
    .string()
    .min(50, '최소 50자 이상 작성하셔야 합니다.')
    .max(200, '최대 200자까지 작성 가능합니다.'),
});

type FormValues = InferType<typeof schema>;

const RecordWriteForm = () => {
  const navigate = useNavigate();
  const { missionId } = useParams<{ missionId: string }>();
  /*const {
    data: missionData,
    mutate,
    isPending: postPending,
    isSuccess,
  } = useMutation({
    mutationFn: (missionRecord: MissionRecord) => postMissionRecord(missionRecord),
    onError: () => {
      alert('미션 기록 작성에 실패');
    },
  });

  const { data, isPending } = useQuery({
    queryKey: ['missionRecord', missionId],
    queryFn: () => getMissionRecord(missionId!!),
  });*/

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  /*const onSubmit: SubmitHandler<FormValues> = (data) => {
    const missionRecord: MissionRecord = {
      id: Number(missionId),
      content: data.mission!!,
      feedback: data.feeling!!,
    };
    mutate(missionRecord);
  };

  if (isPending || postPending) {
    return <Loading />;
  }

  if (isSuccess && !postPending) {
    console.log(missionData);
    if (missionData?.allCompleted) {
      navigate(navigations.GOAL_COMPLETE, {
        state: {
          level: missionData.characterResponseDTOForMission.level,
          areaName: missionData.missionResponse2DTO.areaName,
          characterType: missionData.characterResponseDTOForMission.characterType,
        },
      });
    } else {
      navigate('/mission/complete', { replace: true });
    }
  }*/

  return (
    <InputFormWrapper>
      <MissionTitle>{'3일 동안의 식단 작성하기'}</MissionTitle>
      <form
        onSubmit={() => console.log('제출완료')}
        style={{ height: '100%', display: 'flex', flexDirection: 'column', marginTop: '30px' }}
      >
        <InputContainer>
          <RecordInput
            title='어떤 미션을 수행했나요?'
            name='mission'
            register={register}
            error={errors.mission?.message}
          />
          <RecordInput
            title='수행 후 어떤 기분이 들었나요?'
            name='feeling'
            register={register}
            error={errors.feeling?.message}
          />
          <ButtonContainer>
            <CustomButton onClick={() => navigate(-1)} label='완료' isValid={isValid} />
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
