import styled from 'styled-components';

interface ProgressProps {
  value: number;
}

function ProgressBar({ value }: ProgressProps) {
  return (
    <Container>
      <ProgressBox percent={value}>
        <div className='content' />
      </ProgressBox>
      <p>{value}%</p>
    </Container>
  );
}

export default ProgressBar;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;

  > p {
    ${({ theme }) => theme.fonts.body_m_16px};
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const ProgressBox = styled.div<{ percent: number }>`
  position: relative;
  width: 80%;
  height: 30px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.sub2};

  .content {
    position: absolute;
    left: 0;
    width: ${({ percent }) => percent}%;
    height: 30px;
    background: linear-gradient(90deg, #59D9CC 0%, #E0FFFC 119.85%);
    border-radius: 20px;
  }
`;
