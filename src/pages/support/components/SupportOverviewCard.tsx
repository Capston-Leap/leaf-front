import styled from 'styled-components';
import slime from '@img/img-supportslime.png';

const SupportOverviewCard = () => {
  return (
    <CardContainer>
      <TextContainer>
        <Title>
          다양한 지원제도
          <br />
          지금 바로 알아보세요
        </Title>
        <TextSmall>자립의 첫걸음을 위해</TextSmall>
      </TextContainer>
      <ImageContainer>
        <img src={slime} alt="slime" style={{ width: '150px', height: '150px' }} />
      </ImageContainer>
    </CardContainer>
  );
};

export default SupportOverviewCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  width: 100%;
  max-width: 480px;
  height: 150px;
  border-radius: 32px;
  border: none;
  background-color: ${({ theme }) => theme.colors.yellow};
  padding: 20px 24px 16px 24px;
  margin-bottom: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const TextContainer = styled.div`
  //flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

const TextSmall = styled.div`
  font: ${({ theme }) => theme.fonts.body_m_14px};
  color: ${({ theme }) => theme.colors.gray900};
`;

const Title = styled.div`
  font: ${({ theme }) => theme.fonts.body_sb_18px};
  color: ${({ theme }) => theme.colors.gray900};
`;

const ImageContainer = styled.div`
  //flex: 1;
  display: flex;
  align-items: center;
`;
