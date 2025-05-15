import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
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

const DiaryWriteForm = () => {
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
      <form
        onSubmit={() => console.log('제출완료')}
        style={{ height: '100%', display: 'flex', flexDirection: 'column', marginTop: '30px' }}
      >
        <InputContainer>
          <RecordInput
            title='오늘 어떤 하루를 보냈나요?'
            name='mission'
            register={register}
            error={errors.mission?.message}
          />
          <RecordInput
            title='기억에 남는 일이 있었나요??'
            name='feeling'
            register={register}
            error={errors.feeling?.message}
          />
          {/*<CommentContainer>
            <Comment
              content={`수행일지를 작성하면\n버디가 코멘트를 달아드려요!`}
              completed={false}
            />
          </CommentContainer>*/}
          <ButtonContainer>
            <CustomButton onClick={() => navigate('/mission/complete')} label='완료' isValid={isValid} />
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
