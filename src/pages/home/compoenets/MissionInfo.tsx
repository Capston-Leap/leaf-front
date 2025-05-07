import styled from 'styled-components';
import ProgressBar from "@home/compoenets/ProgressBar.tsx";

interface MissionInfoProps {
  nickname: string;
  level: number;
  missionProPer: number;
}

function MissionInfo({ nickname, level, missionProPer }: MissionInfoProps) {
  const missionRestCount = (100 - missionProPer) / 25;
  return (
    <Container>
      <span className='body-m-dark'>{nickname}님</span>
      <ProgressBar value={missionProPer} />
      <div>
        <span className='body-m-dark'>레벨 {level} </span>
        <span className='body-m-600'>
          목표 달성까지 <span className='body-m-purple '>{missionRestCount}개의 미션</span>이
          남았어요!
        </span>
      </div>
    </Container>
  );
}

export default MissionInfo;

const Container = styled.div`
  width: 80%;
  height: 111px;
  border-radius: 26px;
  background: #ffffff;
  padding: 13px 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .body-m-dark {
    ${({ theme }) => theme.fonts.body_m_12px};
    color: ${({ theme }) => theme.colors.gray900};
  }

  .body-m-600 {
    ${({ theme }) => theme.fonts.body_m_12px};
    color: ${({ theme }) => theme.colors.gray600};
  }

  .body-m-purple {
    ${({ theme }) => theme.fonts.body_m_12px};
    color: ${({ theme }) => theme.colors.primary_lighten100};
  }
`;
