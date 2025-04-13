import styled from 'styled-components';

const Description = () => {
  return (
    <DescriptionContainer>
      <BoldText>
        버디와 함께할
        <br />
        자립목표 영역을 선택해주세요
      </BoldText>
      <MediumText>
        한개의 영역을 마스터하면
        <br />그 다음 영역을 고를 수 있어요
      </MediumText>
    </DescriptionContainer>
  );
};

export default Description;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  gap: 14px;
  padding: 0 9px;
`;

const BoldText = styled.div`
  font: ${({ theme }) => theme.fonts.heading_sb_24px};
  color: ${({ theme }) => theme.colors.gray900};
`;

const MediumText = styled.div`
  font: ${({ theme }) => theme.fonts.body_m_16px};
  color: ${({ theme }) => theme.colors.gray500};
`;
